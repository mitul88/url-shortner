import { Router } from "express";
import { createShortUrl } from "../controller/url-shortner.controller";
import { checkUrl } from "../middleware/check-url.middleware";

export const router = Router();

router.route("/create-short-url").post([checkUrl], createShortUrl);
