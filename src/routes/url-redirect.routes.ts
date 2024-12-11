import { Router } from "express";
import { checkCache } from "../middleware/cache.middleware";
import { getShortUrl } from "../controller/url-shortner.controller";

export const router = Router();

router.route("/:hash").get([checkCache], getShortUrl);
