import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface UserPayload {
  id: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const checkSessionToken = (req: Request, resp: Response, next: Function) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (error) {}

  next();
};

export default checkSessionToken;
