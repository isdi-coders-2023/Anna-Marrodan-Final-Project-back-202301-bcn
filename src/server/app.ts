import "../loadEnvironment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { usersRouter } from "../routes/router.js";

export const app = express();

const allowedOrigins = [
  process.env.CORS_ALLOWED_ORIGIN_LOCAL!,
  process.env.CORS_ALLOWED_ORIGIN_PRODUCTION!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/plantips", usersRouter);
