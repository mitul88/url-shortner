import { Request, Response } from "express-serve-static-core";
import { CreateShortUrlDto } from "../dto/CreateShortUrl.dto";
import { CreateShortUrlResponse } from "../types/response";

export const getShortUrl = async (req: Request, res: Response) => {
  res.status(200).send({ message: "short url hit" });
  res.end();
};

export const createShortUrl = async (
  req: Request<{}, {}, CreateShortUrlDto>,
  res: Response<CreateShortUrlResponse>
) => {
  res.status(201).send({ message: "short url created", shortUrl: "short url" });
  res.end();
};
