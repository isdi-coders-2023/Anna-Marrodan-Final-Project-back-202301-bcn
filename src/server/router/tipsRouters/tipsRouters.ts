import { Router } from "express";
import { getTips } from "../../controllers/tipControllerss/tipControllers.js";

export const tipsRouter = Router();

tipsRouter.get("/tips", getTips);
