import { Request, Response } from "express";

const signOutController = (req: Request, resp: Response) => {
  req.session = null;

  resp.send({});
};

export default signOutController;
