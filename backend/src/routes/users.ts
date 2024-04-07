import express, { Request, Response } from "express";
import User from "../models/hospitals";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import validate from "../middlewares/validateRegistration";
import Hospital from "../models/hospitals";
import mongoose from "mongoose";
import generateDoctorId from "../middlewares/generateID";
import verifyDoc from "../middlewares/verifyDoc";

const router = express.Router();

router.post("/hospitalRegister", validate, async (req: Request, res: Response) => {
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
    hospital = new Hospital(req.body);
    await hospital.save();

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
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!.." });
  }
});

export default router;
