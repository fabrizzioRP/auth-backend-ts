import CustomError from "./custom-error";

class ConnectionDatabaseError extends CustomError {
  public statusCode: number = 500;
  private reason = "Error connecting to database";

  constructor() {
    super("Error connecting to database");

    Object.setPrototypeOf(this, ConnectionDatabaseError.prototype);
  }

  public serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}

export default ConnectionDatabaseError;
