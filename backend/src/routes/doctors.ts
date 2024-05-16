import express, { Request, Response } from "express";
import multer from "multer"; // npm i --save-dev @types/multer do this after installing multer
import cloudinary from "cloudinary";
import { DoctorType } from "../shared/types";
import verifyToken from "../middlewares/auth";
import verifyDoc from "../middlewares/verifyDoc";
import generateDoctorId from "../middlewares/generateID";
import generateDoctorPass from "../middlewares/generatePass";
import { validationResult } from "express-validator";
import Doctor from "../models/doctor";
import validateRegstration from "../middlewares/validateRegistration";
import jwt from "jsonwebtoken";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

// Doctor Signup for Registration

router.post(
  "/doc-signup",
  validateRegstration,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let doctor = await Doctor.findOne({
        email: req.body.email,
      });
      if (doctor) {
        return res.status(400).json({
          message: "Doctor already exists",
        });
      }
      doctor = new Doctor(req.body);
      await doctor.save();

      const token = jwt.sign(
        { UserId: doctor.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).json({
        message: "Signed in successfully",
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!.." });
    }
  }
);

// Doctor Register After SignUP
router.post(
  "/doctor-register",
  verifyToken,
  verifyDoc,
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ message: errors.array() });
    }
    try {
      const existingDoc = await Doctor.findOne({ email: req.body.email });

      if (existingDoc) {
        return res.status(400).json({
          message: "Doctor already registered",
        });
      }
      // Check if imageFile is undefined
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
      // Access uploaded file from req.file
      const imageFile = req.file as Express.Multer.File;
      const newDoc: DoctorType = req.body;
      //converting into link_URI
      const b64 = Buffer.from(imageFile.buffer).toString("base64");
      let dataURI = "data:" + imageFile.mimetype + ";base64," + b64;
      // Upload image to cloudinary
      const result = await cloudinary.v2.uploader.upload(dataURI);
      const photoUrl = result.url;

      newDoc.photo_Url = photoUrl;
      newDoc.password = generateDoctorPass(req.body.date_of_birth);
      newDoc.DocId = generateDoctorId(
        req.body.first_name,
        req.body.last_name,
        req.body.date_of_birth
      );
      newDoc.isApproved = true;
      // Save the new doctor document
      console.log(newDoc)
      const currDoc = new Doctor(newDoc);
      await currDoc.save();

      // Return success response
      res.status(201).json(currDoc);
    } catch (error) {
      console.error("Error uploading data: ", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
