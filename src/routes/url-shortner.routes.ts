import { Router } from "express";
import {
  createShortUrl,
  getShortUrl,
} from "../controller/url-shortner.controller";
import { checkUrl } from "../middleware/check-url.middleware";
import { checkCache } from "../middleware/cache.middleware";

export const router = Router();

router.route("/lnk/:hash").get([checkCache], getShortUrl);
router.route("/create-short-url").post([checkUrl], createShortUrl);
