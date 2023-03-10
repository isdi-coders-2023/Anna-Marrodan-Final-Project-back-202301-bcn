import "../loadEnvironment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { usersRouter } from "./router/usersRouter/usersRouter.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import { tipsRouter } from "./router/tipsRouters/tipsRouters.js";

export const app = express();

const allowedOrigins = [
  process.env.CORS_ALLOWED_ORIGIN_LOCAL!,
  process.env.CORS_ALLOWED_ORIGIN_PRODUCTION!,
  process.env.CORS_ALLOWED_ORIGIN_LOCAL_1!,
  process.env.CORS_ALLOWED_ORIGIN_LOCAL_2!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/plantips", usersRouter, tipsRouter);

app.use(notFoundError);
app.use(generalError);
