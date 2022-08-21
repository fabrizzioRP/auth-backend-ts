import { Router } from "express";

import checkSessionToken from "../middlewares/check-session";
import { currentUserController } from "../controllers/index";

const router: Router = Router();

router.get("/currentuser", checkSessionToken, currentUserController);

export default router;
