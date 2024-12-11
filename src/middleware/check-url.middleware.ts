import { NextFunction, Request, Response } from "express-serve-static-core";
import { validateUrl } from "../utils/validate-url";

module.exports.checkUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.url) {
    res.status(404).send({ message: "please provide url" });
    res.end();
  }

  let validate = validateUrl(req.body.url);
  if (!validate) {
    res.status(404).send({ message: "please provide a valid url" });
    res.end();
  } else {
    next();
  }
};
