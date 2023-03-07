import { type Response, type Request, type NextFunction } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { CustomError } from "../../CustomError/CustomError";
import { LoginUser } from "../../database/models/User";
import { type LoginUserStructure } from "../../types";

const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    LoginUserStructure
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const user = await LoginUser.findOne({ username });

    if (!user) {
      const error = new CustomError("User not found", 401, "Wrong credentials");
      next(error);
      return;
    }

    const passwordComparer = await bcryptjs.compare(password, user.password);

    if (!passwordComparer) {
      const error = new CustomError("Wrong password", 401, "Wrong credentials");

      next(error);
      return;
    }

    const jwtPayload = {
      sub: user._id,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
