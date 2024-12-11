import { Request, Response, NextFunction } from "express";
import { GetUrlParam } from "../types/request";
import { getValue } from "../service/redis.service";
import { ENV_CONFIG } from "../config/env.config";

export const checkCache = async (
  req: Request<GetUrlParam>,
  res: Response,
  next: NextFunction
) => {
  const hash = req.params.hash;
  const hashExist = await getValue(hash);
  if (hashExist) {
    res.status(200).send({
      message: "url fetched from cache",
      shortUrl: `${ENV_CONFIG.DOMAIN}/${hash}`,
    });
    res.end();
    return;
  }
  next();
};
