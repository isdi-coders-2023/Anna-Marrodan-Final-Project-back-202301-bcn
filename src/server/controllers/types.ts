import { type JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload {
  username: string;
  id: string;
}
