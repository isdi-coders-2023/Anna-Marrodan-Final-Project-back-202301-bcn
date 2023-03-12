import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import { Tip } from "../../../database/models/Tip";

export const getTips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tips = await Tip.find().exec();

    res.status(200).json({ tips });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      400,
      "Couldn't retrieve tips"
    );

    next(customError);
  }
};
