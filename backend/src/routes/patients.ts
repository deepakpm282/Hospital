import express, { Request, Response } from "express";
import passport from "passport";
import isAuthenticated from "../middlewares/isAuthenticated";
import Patient from "../models/patients";
import { PatientType } from "../shared/types";
import { validationResult } from "express-validator";
import verifyToken from "../middlewares/auth";
import { RemoveUserOptions } from "mongodb";
import Appointment from "../models/appointments";
import patientAppointment from "../models/patient-appoiments";

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
  // isAuthenticated,
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
      let existing_Patient = await Patient.findOne({ google_id });
      if (existing_Patient) {
        existing_Patient.last_name = last_name;
        existing_Patient.phone_number = phone_number;
        existing_Patient.date_of_birth = dob;
        existing_Patient.gender = gender;
        existing_Patient.address = address;
        existing_Patient.city = city;
        existing_Patient.state = state;
        existing_Patient.country = country;
        existing_Patient.zip_code = pincode;
        // Save the updated patient document
        existing_Patient = await existing_Patient.save();
        return res
          .status(200)
          .json({ message: "Patient updated successfully" });
      } else {
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

router.post(
  "/patient-booking-appointments",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ messgage: errors.array() });
    }
    try {
      const patient = await Patient.findById(req.params.asso_patient_id);
      if (!patient) {
        return res
          .status(404)
          .json({
            messgae:
              "User(Patient) Not found, Please Register before making appointments",
          });
      }
      const appointment = await Appointment.findById(
        req.body.asso_appointment_id
      );
      if (!appointment) {
        return res
          .status(404)
          .json({ messgae: "Not a verified appointment by doctor" });
      }

      const new_booking = new patientAppointment(req.body);

      await new_booking.save();

      return res.status(201).json({ message: "New Appointment Booked" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get(
  "/get-patient-appointments",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ messgage: errors.array() });
    }
    try {
      const appointments = await Appointment.find({
        asso_patient_id: req.params.patient_id,
      });
      if (!appointments) {
        return res.status(404).json({ message: "No appointments found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
