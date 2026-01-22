import dotenv from "dotenv";

dotenv.config();

export const envVars = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI as string || "mongodb://localhost:27017/myapp",
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND || "10",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_ACCESS_EXPIRES: (process.env.JWT_ACCESS_EXPIRES as string) || "1d",
  NODE_ENV: (process.env.NODE_ENV as string) || "development",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
};
