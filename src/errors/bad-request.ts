import CustomError from "./custom-error";

class BadRequestError extends CustomError {
  public statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  public serializeError() {
    return [{ message: this.message }];
  }
}

export default BadRequestError;
