import dotenv from "dotenv";

import app from "./app";
import connectMongoDB from "./database/config.db";

dotenv.config();

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  await connectMongoDB(process.env.MONGOURI);
});
