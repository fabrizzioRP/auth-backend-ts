import CustomError from "./custom-error";

class NotFoundError extends CustomError {
  public statusCode = 400;

  constructor() {
    super("Route Not Found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public serializeError() {
    return [{ message: "Route Not Found" }];
  }
}

export default NotFoundError;
