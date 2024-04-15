import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type hospital = {
  _id: string;
  hospital_name: string;
  phone_number_1: number;
  phone_number_2: number;
  email: string;
  password: string;
  confirm_password: string;
  date_established: string;
  unique_identification_number: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  isVerified: boolean;
};

const hospitalSchema = new mongoose.Schema({
  hospital_name: { type: String, unique: false },
  phone_number_1: { type: Number, unique: true },
  phone_number_2: { type: Number, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date_established: { type: String, unique: true },
  unique_identification_number: { type: String, unique: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zip_code: { type: String },
  isVerified: { type: Boolean, default: false },
});

hospitalSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;
