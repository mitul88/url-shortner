import dotenv from "dotenv";
dotenv.config();
export const ENV_CONFIG = {
  PORT: process.env.PORT,
  ENVIORNMENT: process.env.ENVIORNMENT,
  DATABASE_URL: process.env.DATABASE_URL,
};
