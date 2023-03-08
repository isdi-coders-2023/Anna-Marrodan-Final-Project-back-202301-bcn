import { Router } from "express";
import { loginUser } from "../controllers/userControllers/userControllers.js";

export const usersRouter = Router();

usersRouter.post("/login", loginUser);
