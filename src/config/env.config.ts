import dotenv from "dotenv";
dotenv.config();
export const ENV_CONFIG = {
  PORT: process.env.PORT,
  ENVIORNMENT: process.env.ENVIORNMENT,
  PRODUCTION_DATABASE_URL: process.env.PRODUCTION_DATABASE_URL,
  LOCAL_DATABASE_URL: process.env.LOCAL_DATABASE_URL,
};
