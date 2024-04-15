import { body } from "express-validator";

export const verifyDoc = [
  body("first_name").notEmpty().withMessage("First Name required"),
  body("last_name").notEmpty().withMessage("Last Name required"),
  body("phone_number")
    .notEmpty()
    .withMessage("Phone Number required")
    .isNumeric()
    .isLength({ min: 10 })
    .withMessage("Phone Number must be a number"),
  body("email").isEmail().withMessage("Email is required"),
  body("degrees").notEmpty().withMessage("Degrees required"),
  body("registration_number")
    .notEmpty()
    .withMessage("Registration Number required"),
  body("year_of_registration")
    .notEmpty()
    .withMessage("Year of Registration required")
    .isNumeric()
    .withMessage("Year of Registration must be a number"),
  body("state_medical_council")
    .notEmpty()
    .withMessage("State Medical Council required"),
  body("experience")
    .notEmpty()
    .withMessage("Experience required")
    .isNumeric()
    .withMessage("Experience must be a number"),
  body("address").notEmpty().withMessage("Address required"),
  body("city").notEmpty().withMessage("City required").isLength({ max: 64 }),
  body("state").notEmpty().withMessage("State required"),
  body("country").notEmpty().withMessage("Country required"),
  body("zip_code")
    .notEmpty()
    .withMessage("Zip Code required")
    .isNumeric()
    .withMessage("Zip Code must be a number"),
];

export default verifyDoc;
