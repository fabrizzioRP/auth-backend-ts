import { Router } from "express";

import { signOutController } from "../controllers/index";

const router: Router = Router();

router.post("/signout", signOutController);

export default router;
