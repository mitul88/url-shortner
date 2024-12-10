import { Router } from "express";
import {
  createShortUrl,
  getShortUrl,
} from "../controller/url-shortner.controller";

export const router = Router();

router.route("/").get(getShortUrl);
router.route("/create-short-url").post(createShortUrl);
