import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { DoctorType } from "../shared/types";

const docSchema = new mongoose.Schema<DoctorType>({
  DocId: { type: String, required: true },
  associated_hos_id: { type: String, required: true},
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, required: true },
  degrees: { type: String, required: true },
  registration_number: { type: String, required: true },
  year_of_registration: { type: Number, required: true },
  state_medical_council: { type: String, required: true },
  experience: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip_code: { type: Number, required: true },
  isApproved: { type: Boolean, required: true, default: true },
  photo_Url: { type: String, required: true },
});

docSchema.pre("save", async function (next){
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const Doctor = mongoose.model<DoctorType>("Doctor", docSchema);

export default Doctor;
