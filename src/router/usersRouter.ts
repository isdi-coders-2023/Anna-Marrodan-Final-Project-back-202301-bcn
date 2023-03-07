import { Router } from "express";
import { loginUser } from "../server/controllers/controllers.js";

export const usersRouter = Router();

usersRouter.post("/login", loginUser);
