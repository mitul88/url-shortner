import { Express } from "express";
import { router as urlShortnerRouter } from "./url-shortner.routes";

export = (app: Express) => {
  app.use("/api", urlShortnerRouter);
};
