import express, { Request, Response } from "express";
import multer from "multer"; // npm i --save-dev @types/multer do  this after installing multer
import cloudinary from "cloudinary";
import { promises } from "dns";
import Doctor, { Doctors } from "../models/doctor";
import verifyToken from "../middlewares/auth";
import verifyDoc from "../middlewares/verifyDoc";
import generateDoctorId from "../middlewares/generateID";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

router.post(
  "/doctorRegister",
  verifyToken,
  verifyDoc,
  upload.single("imageFile"), // multer will handle only arrays.
  async (req: Request, res: Response) => {
    try {
      const imageFile = req.body as Express.Multer.File;
      const newDoc: Doctors = req.body;

      // 1. Upload the images to the cloudinary.
      const b64 = Buffer.from(imageFile.buffer).toString("base64");
      let dataURI = "data:" + imageFile.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      const photoUrl = res.url;

      // 2. if the upload was succesfull, add the urls to the new Doctor
      newDoc.photoUrl = photoUrl;
      newDoc.DocId = generateDoctorId(
        newDoc.first_name,
        newDoc.last_name,
        newDoc.date_of_birth
      );
      console.log(newDoc.DocId);
      // 3. Save the new Doctor to the database
      const doctor = new Doctor(newDoc);
      await doctor.save();

      // 4.  return a 201 status
      res.status(201).send(doctor);
    } catch (error) {
      console.log("Error uploading data: ", error);
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
);

export default router;
