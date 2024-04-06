import { body } from "express-validator";

export const verifyDoc = [
  // body("userId").notEmpty().withMessage("User ID required"),
  body("first_name").notEmpty().withMessage("First Name required"),
  body("last_name").notEmpty().withMessage("Last Name required"),
  body("phone_number")
    .notEmpty()
    .withMessage("Phone Number required")
    .isNumeric()
    .isLength({ max: 10 })
    .withMessage("Phone Number must be a number"),
  body("email").isEmail().withMessage("Email is required"),
  // body("password", "must meet complexity requirements")
  //   .isLength({ min: 6 })
  //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "i")
  //   .withMessage(
  //     "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
  //   ),
  // body("confirm_password", "Passwords do not match").custom(
  //   (value, { req }) => value === req.body.password
  // ),
  // body("date_of_birth").isDate().withMessage("Date of birth Required"),
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
