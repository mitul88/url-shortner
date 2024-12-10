import express from "express";
import routes from "./routes/routes";

export const app = express();

// calling all routes
routes(app);
