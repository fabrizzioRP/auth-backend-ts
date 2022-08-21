import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

import User from "../models/auth.model";
import { BadRequestError } from "../errors";
import DataRequest from "../helpers/data-req";

dotenv.config();

const signUpController = async (req: Request, resp: Response) => {
  const { name, email, password }: DataRequest = req.body;

  // validate exists email
  const existsUser = await User.findOne({ email });
  if (existsUser) throw new BadRequestError("Email in use");

  // create user
  const user = User.build({ name, email, password });
  await user.save();

  // Generate Token
  const token = sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  // Store token in cookie session object
  req.session = { jwt: token };

  resp.status(201).json(user);
};

export default signUpController;
