import { check } from "express-validator";

export const login = [
  check("email", "Email required").isEmail(),
  check("password", "Password required").isLength({ min: 6 }),
];

export default login;
