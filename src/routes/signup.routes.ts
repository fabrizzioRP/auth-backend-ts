import { Router } from "express";
import { body } from "express-validator";

import { signUpController } from "../controllers/index";
import fieldsCheck from "../middlewares/fields-check";

const router: Router = Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Missing field name"),
    body("email", "Missing field email").notEmpty(),
    body("email", "Email value is incorrect").isEmail(),
    body("password")
      .trim()
      .isLength({ min: 6, max: 15 })
      .withMessage("Password must be between 6 and 15 characters"),
    fieldsCheck,
  ],
  signUpController
);

export default router;
