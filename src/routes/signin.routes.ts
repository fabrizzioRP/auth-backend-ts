import { Router } from "express";
import { body } from "express-validator";

import { signInController } from "../controllers/index";
import fieldsCheck from "../middlewares/fields-check";

const router: Router = Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
    fieldsCheck,
  ],
  signInController
);

export default router;
