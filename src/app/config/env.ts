import dotenv from "dotenv";

dotenv.config();

export const envVars = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND || "10",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
}