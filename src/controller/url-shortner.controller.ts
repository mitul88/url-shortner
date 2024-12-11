import { Request, Response } from "express-serve-static-core";
import { CreateShortUrlDto } from "../dto/CreateShortUrl.dto";
import { CreateShortUrlResponse } from "../types/response";
import { urlShortner } from "../utils/url-shortner";
import { PrismaClient } from "@prisma/client";
import { ENV_CONFIG } from "../config/env.config";
import { GetUrlParam } from "../types/request";
import { expireValue, getValue, setValue } from "../service/redis.service";
import { CACHE_CONFIG } from "../config/cache.config";

const prisma = new PrismaClient();

export const getShortUrl = async (req: Request<GetUrlParam>, res: Response) => {
  const hash = req.params.hash;
  try {
    const redirectUrl = await prisma.url.findUnique({
      where: {
        hashed: hash,
      },
    });

    if (!redirectUrl) {
      res.status(400).send({ message: "url not found" });
      res.end();
      return;
    }

    // save the url in cache if it does not exist in cache
    const cacheCheck = await getValue(hash);
    if (!cacheCheck) {
      await setValue(hash, redirectUrl.url);
      // cache expires after specific second derived from cache config file
      await expireValue(hash, CACHE_CONFIG.EXPIRE_IN_SECOND);
    }

    res.status(302).send({
      message: "url fetched for redirect",
      redirect: redirectUrl?.url,
    });
    res.end();
    return;
  } catch (error) {
    res.status(500).send({ message: "internal error" });
    res.end();
    return;
  }
};

export const createShortUrl = async (
  req: Request<{}, {}, CreateShortUrlDto>,
  res: Response<CreateShortUrlResponse>
) => {
  const unique = (Date.now() + Math.floor(Math.random() * 10001)).toString();
  const hashedUrl = urlShortner(unique);

  try {
    let urlExist = await prisma.url.findFirst({
      where: {
        url: req.body.url,
      },
    });
    if (urlExist) {
      res.status(200).send({
        message: "Url fetched",
        shortUrl: `${ENV_CONFIG["DOMAIN"]}/${urlExist.hashed}`,
      });
      res.end();
      return;
    }
    await prisma.url.create({
      data: {
        hashed: hashedUrl,
        url: req.body.url,
      },
    });
    res.status(201).send({
      message: "short url created",
      shortUrl: `${ENV_CONFIG["DOMAIN"]}/${hashedUrl}`,
    });
    res.end();
    return;
  } catch (err) {
    res.status(500).send({ message: "internal error" });
    res.end();
    return;
  }
};
