import cors from "cors";
import "express-async-errors";
import cookieSession from "cookie-session";
import express, { Express } from "express";

import { NotFoundError } from "./errors";
import handlerError from "./middlewares/handler-error";
import {
  currentUserRoute,
  signInRoute,
  signOutRoute,
  signUpRoute,
} from "./routes";

const app: Express = express();
const paths: { auth: string } = { auth: "/auth/user" };

// Middlewares
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

// Routes
app.use(paths.auth, signUpRoute);
app.use(paths.auth, signInRoute);
app.use(paths.auth, signOutRoute);
app.use(paths.auth, currentUserRoute);

// Error Not Found
app.all("*", async (req, resp) => {
  throw new NotFoundError();
});

// Error Handler
app.use(handlerError);

export default app;
