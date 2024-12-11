import { Request, Response } from "express-serve-static-core";
import { CreateShortUrlDto } from "../dto/CreateShortUrl.dto";
import { CreateShortUrlResponse } from "../types/response";
import { urlShortner } from "../utils/url-shortner";
import { PrismaClient } from "@prisma/client";
import { ENV_CONFIG } from "../config/env.config";

const prisma = new PrismaClient();

export const getShortUrl = async (req: Request, res: Response) => {
  res.status(200).send({ message: "short url hit" });
  res.end();
  return;
};

export const createShortUrl = async (
  req: Request<{}, {}, CreateShortUrlDto>,
  res: Response<CreateShortUrlResponse>
) => {
  const hashedUrl = urlShortner(req.body.url);
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
  }
};
