import { Request, Response } from "express-serve-static-core";
import { CreateShortUrlDto } from "../dto/CreateShortUrl.dto";
import { CreateShortUrlResponse } from "../types/response";
import { urlShortner } from "../utils/url-shortner";

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
  res.status(201).send({ message: "short url created", shortUrl: hashedUrl });
  res.end();
  return;
};
