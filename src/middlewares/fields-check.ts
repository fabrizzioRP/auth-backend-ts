import { validationResult } from "express-validator";
import { Request, Response } from "express";

import { RequestValidationError } from "../errors";

const fieldsCheck = (req: Request, resp: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

export default fieldsCheck;
