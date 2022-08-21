import CustomError from "./custom-error";

class NotAuthorizedError extends CustomError {
  public statusCode = 401;

  constructor() {
    super("Not Authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  public serializeError() {
    return [{ message: "Not Authorized" }];
  }
}

export default NotAuthorizedError;
