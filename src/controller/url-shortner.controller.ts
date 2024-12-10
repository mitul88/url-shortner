import { Request, Response } from "express";

export const getShortUrl = async (req: Request, res: Response) => {
  console.log("hello");
  res.status(200).send({ message: "short url hit" });
  res.end();
};
