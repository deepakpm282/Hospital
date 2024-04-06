import express, { Request, Response } from "express";
import validate from "../middlewares/validateLogin";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/auth";
import Hospital from "../models/hospitals";

const router = express.Router();

router.post("/hospitallogin", validate, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const hospital = await Hospital.findOne({ email });

    if (!hospital) {
      return res.status(400).json({ message: "Hospital not found" });
    }
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

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
    res.status(200).json({ Token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Validating the token that are created during the signUps and Logins
router.post("/validate-token", verifyToken, (req: Request, res: Response) => {
  /* here it will check for the cookie */
  res.status(200).send({ message: "Token valid", usersId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send({ message: "User Signed Out" });
});

export default router;
