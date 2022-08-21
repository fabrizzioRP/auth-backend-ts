import mongoose from "mongoose";

import { ConnectionDatabaseError } from "../errors";

const connectMongoDB = async (uri: string | undefined) => {
  try {
    console.log("Connecting Database...");
    await mongoose
      .connect(uri!)
      .then(() => console.log("Connect Successfully"));
  } catch (error) {
    throw new ConnectionDatabaseError();
  }
};

export default connectMongoDB;
