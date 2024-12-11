import { Express } from "express";
import { router as urlShortnerRouter } from "./url-shortner.routes";
import { router as urlRedirectRouter } from "./url-redirect.routes";

export = (app: Express) => {
  app.use("/lnk", urlRedirectRouter);
  app.use("/api", urlShortnerRouter);
};
