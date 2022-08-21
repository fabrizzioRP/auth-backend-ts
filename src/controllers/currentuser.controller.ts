import { Request, Response } from "express";

import { NotAuthorizedError } from "../errors";

const currentUserController = async (req: Request, resp: Response) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  resp.json({ currentUser: req.currentUser || null });
};

export default currentUserController;
