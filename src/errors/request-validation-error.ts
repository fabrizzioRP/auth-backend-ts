import { ValidationError } from "express-validator";
import CustomError from "./custom-error";

class RequestValidationError extends CustomError {
  public statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serializeError() {
    return this.errors.map((err) => {
      return {
        message: err.msg,
        fields: err.param,
      };
    });
  }
}

export default RequestValidationError;
