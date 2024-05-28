import express, { Request, Response } from "express";
import passport from "passport";
import isAuthenticated from "../middlewares/isAuthenticated";
import Patient from "../models/patients";
import { PatientType } from "../shared/types";
import { validationResult } from "express-validator";

const router = express.Router();

// Route to start the Google OAuth process
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to frontend.
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

// Route to check if user is authenticated
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

// Route to log out
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.FRONTEND_URL as string);
  });
});

router.post(
  "/patient-register",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      const {
        google_id,
        last_name,
        phone_number,
        dob,
        gender,
        address,
        city,
        state,
        country,
        pincode,
      } = req.body;
      let existing_Patient = await Patient.findById({ google_id });
      if(existing_Patient){
        existing_Patient.Last_Name = last_name;
        existing_Patient.Phone_Number = phone_number;
        existing_Patient.Date_Of_Birth = dob;
        existing_Patient.Gender = gender;
        existing_Patient.Address = address;
        existing_Patient.City = city
        existing_Patient.State = state;
        existing_Patient.Country = country;
        existing_Patient.Zip_code = pincode;
        // Save the updated patient document
        existing_Patient = await existing_Patient.save();
      }else {
        // If the patient does not exist, return an error
        return res
          .status(404)
          .json({ message: "Patient not found, Please SignUp first" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went Wrong" });
    }
  }
);

export default router;
