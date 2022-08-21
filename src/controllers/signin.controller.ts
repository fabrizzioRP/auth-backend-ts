import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

import User from "../models/auth.model";
import { BadRequestError } from "../errors";
import DataRequest from "../helpers/data-req";
import HashGenerate from "../helpers/generate-password";

dotenv.config();

const signInController = async (req: Request, resp: Response) => {
  const { email, password }: DataRequest = req.body;

  // validate exists email
  const existsUser = await User.findOne({ email });
  if (!existsUser) throw new BadRequestError("Invalid Credentials");

  // Password Match
  const passwordMatch = await HashGenerate.compare(
    existsUser.password,
    password
  );

  if (!passwordMatch) throw new BadRequestError("Invalid Credentials");

  // Generate Token
  const token = sign(
    {
      id: existsUser.id,
      email: existsUser.email,
    },
    process.env.JWT_KEY!
  );

  // store token in session object
  req.session = { jwt: token };

  resp.status(200).json(existsUser);
};

export default signInController;
