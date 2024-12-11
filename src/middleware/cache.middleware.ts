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
    res.status(302).send({
      message: "url fetched from cache",
      redirect: `${hashExist}`,
    });
    res.end();
    return;
  }
  next();
};
