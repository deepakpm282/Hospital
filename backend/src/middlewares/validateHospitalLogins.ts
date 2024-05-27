
import { check } from "express-validator";

export const register = [
  check("email", "Email is required").isEmail(),
  check("password", "must meet complexity requirements")
    .isLength({ min: 6 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "i")
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
    ),
  check("confirm_password", "Passwords do not match").custom(
    (value, { req }) => value === req.body.password
  ),
];

export default register;
