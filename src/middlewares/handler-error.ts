import { Request, Response } from "express";
import { CustomError } from "../errors";

const handlerErrors = (
  err: Error,
  req: Request,
  resp: Response,
  next: Function
) => {
  if (err instanceof CustomError) {
    return resp.status(err.statusCode).json({ errors: err.serializeError() });
  }

  return resp.status(400).json({
    errors: [{ message: "Something went wrong" }],
  });
};

export default handlerErrors;
