import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import validateHospitalLogin from "../middlewares/validateHospitalLogins";
import Hospital, { HospitalType } from "../models/hospitals";
import validateHos from "../middlewares/validateHospitalRegistration";
import verifyToken from "../middlewares/auth";
import multer from 'multer';

// Set up multer middleware to handle multipart form data
const upload = multer();
const router = express.Router();

router.post(
  "/hospital-register",
  verifyToken,
  upload.none(),
  validateHos,
  async (req: Request, res: Response) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let existing_Hos = await Hospital.findOne({ _id:req.body.hospital_id })
      if(existing_Hos){
        existing_Hos.hospital_name = req.body.hospital_name;
        existing_Hos.phone_number_1 = req.body.phone_number_1;
        existing_Hos.phone_number_2 = req.body.phone_number_2;
        existing_Hos.date_established = req.body.date_established;
        existing_Hos.unique_identification_number = req.body.unique_identification_number;
        existing_Hos.address = req.body.address;
        existing_Hos.city = req.body.city;
        existing_Hos.state = req.body.state;
        existing_Hos.country = req.body.country;
        existing_Hos.zip_code = req.body.zip_code;
        // Save the updated hospital document
        existing_Hos = await existing_Hos.save();
      } else {
        // If the hospital does not exist, return an error
        return res.status(404).json({ message: "Hospital not found, Please SignUp first" });
      }
      // Return success response
      res.status(201).json(existing_Hos);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!.." });
    }
  }
);

router.post(
  "/hospital-signup",
  validateHospitalLogin,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let hospital = await Hospital.findOne({
        email: req.body.email,
      });

      if (hospital) {
        console.log(hospital.email)
        return res.status(400).json({
          message: "Hospital already exists",
        });
      }

      const { email, password } = req.body;

      hospital = await Hospital.create({ email, password });
      console.log("Hospital added >>", hospital)
      const token = jwt.sign(
        { UserId: hospital.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).json({
        message: "Hospital registered successfully",
        token: token,
        id: hospital._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!.." });
    }
  }
);

export default router;
