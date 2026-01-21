
import express, { type Application, type Request, type Response } from "express";


import cookieParser from "cookie-parser";

import cors from "cors";
import { router } from "./app/router";


const app:Application = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "welcome to the server" });
});

export default app;
