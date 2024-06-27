import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import validateHospitalLogin from "../middlewares/validateHospitalLogins";
import Hospital from "../models/hospitals";
import validateHos from "../middlewares/validateHospitalRegistration";
import verifyToken from "../middlewares/auth";
import multer from "multer";
import Doctor from "../models/doctor";
import Appointment from "../models/appointments";
import Department from "../models/departments";
import { error } from "console";
import { DepartmentType } from "../shared/types";

// Set up multer middleware to handle multipart form data
const upload = multer();
const router = express.Router();

router.post(
  "/hospital-register",
  verifyToken,
  upload.none(),
  validateHos,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let existing_Hos = await Hospital.findOne({ _id: req.body.hospital_id });
      if (existing_Hos) {
        existing_Hos.hospital_name = req.body.hospital_name;
        existing_Hos.phone_number_1 = req.body.phone_number_1;
        existing_Hos.phone_number_2 = req.body.phone_number_2;
        existing_Hos.date_established = req.body.date_established;
        existing_Hos.unique_identification_number =
          req.body.unique_identification_number;
        existing_Hos.address = req.body.address;
        existing_Hos.city = req.body.city;
        existing_Hos.state = req.body.state;
        existing_Hos.country = req.body.country;
        existing_Hos.zip_code = req.body.zip_code;
        // Save the updated hospital document
        existing_Hos = await existing_Hos.save();
      } else {
        // If the hospital does not exist, return an error
        return res
          .status(404)
          .json({ message: "Hospital not found, Please SignUp first" });
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
        return res.status(400).json({
          message: "Hospital already exists",
        });
      }

      const { email, password } = req.body;

      hospital = await Hospital.create({ email, password });
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

router.get("/get-doctor", verifyToken, async (req: Request, res: Response) => {
  try {
    // Find the hospital based on the userId
    const hospital = await Hospital.findById(req.query.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Find doctors associated with the hospital
    const doctors = await Doctor.find({ associated_hos_id: req.query.id });
    // Send the list of doctors associated with the hospital as the response
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

router.get("/get-allDocs", verifyToken, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const doctors = await Doctor.find().select("_id first_name last_name");
    if (!doctors) {
      return res.status(404).json({ message: "No Doctors" });
    }
    // Send the list of doctors associated with the hospital as the response
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

router.get("/get-allDeps", verifyToken, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const departments = await Department.find({
      Associated_Hos_Id: req.params.id,
    }).select("department_name _id");
  
    res.json( departments );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching the departments" });
  }
});

router.get("/get-HosName", verifyToken, async (req: Request, res: Response) => {
  try {
    // Find the hospital based on the userId
    const hospital = await Hospital.findById(req.query.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    // Here get the address and name of the hospital
    const { hospital_name, address } = hospital;

    // Send the address and name  associated with the hospital_id as the response
    res.status(200).json([{ address, hospital_name }]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Hospital Details" });
  }
});

router.post(
  "/appointment-booking",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const Hos = await Hospital.findById(req.body.hospital_id);
      if (!Hos) {
        return res
          .status(404)
          .json({ message: "Not Booking from a verified hospital" });
      }
      console.log(req.body)
      const {
        hospital_id,
        slot_date,
        time_slot,
        doctor_name,
        token,
        doctor_id,
      } = req.body;

      const appointment = new Appointment({
        Hospital_Name: Hos.hospital_name,
        Hospital_Id: hospital_id,
        Slot_Date: slot_date,
        Time_Slot: time_slot,
        Location: Hos.address,
        Doctor_Name: doctor_name,
        Doctor_Id: doctor_id,
        Token: token,
      });
      await appointment.save();
      res
        .status(200)
        .json({ message: "Appointment saved successfully", appointment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post(
  "/departments",
  verifyToken,
  upload.none(),
  async (req: Request, res: Response) => {
    try {
      const hospital = await Hospital.findById(req.body.hospital_id);
      if (!hospital) {
        return res.status(401).json({
          message: "Not a registered Hospital, Process can't be finished",
        });
      }
      const {
        DName,
        mobile,
        email,
        services,
        facilities,
        about,
        additional,
        hospital_id,
      } = req.body;
      const department = new Department({
        department_name: DName,
        Phone_Number: mobile,
        Email: email,
        Services: services,
        Facilities: facilities,
        About: about,
        Additional: additional,
        Associated_Hos_Id: hospital_id,
      });
      await department.save();
      res
        .status(200)
        .json({ message: "Department Added SuccesFully", department });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const doctor = await Doctor.findOne({
      _id: id,
    });
    console.log(doctor);
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Doctor" });
  }
});

export default router;
