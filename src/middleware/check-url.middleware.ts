import { NextFunction, Request, Response } from "express-serve-static-core";
import { validateUrl } from "../utils/validate-url";
import { CreateShortUrlDto } from "../dto/CreateShortUrl.dto";

export const checkUrl = async (
  req: Request<{}, {}, CreateShortUrlDto>,
  res: Response,
  next: NextFunction
) => {
  let url = req.body.url;
  if (!url) {
    res.status(404).send({ message: "please provide url" });
    res.end();
    return;
  }

  let validate = validateUrl(url);
  if (!validate) {
    res.status(404).send({ message: "please provide a valid url" });
    res.end();
    return;
  } else {
    next();
  }
};
