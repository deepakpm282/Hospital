import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import validateHospitalLogin from "../middlewares/validateHospitalLogins";
import Hospital from "../models/hospitals";
// import validateHos from "../middlewares/validateHospitalRegistration";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.post(
  "/hospital-register",
  verifyToken,
  // validateHos,
  async (req: Request, res: Response) => {
    console.log(req.body)
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      res.status(202).json({ message: "ok" });
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
      // await Hospital.deleteMany({ hospital_name: null });

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

export default router;
