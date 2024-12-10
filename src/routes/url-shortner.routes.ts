import { Router } from "express";
import { getShortUrl } from "../controller/url-shortner.controller";

export const router = Router();

router.route("/").get(getShortUrl);
