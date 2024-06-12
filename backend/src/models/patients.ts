import mongoose from "mongoose";
import { PatientType } from "../shared/types";

const patientSchema = new mongoose.Schema<PatientType>({
  google_id: {type: String, required: true},
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: Number, required: true },
  email: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip_code: { type: Number, required: true },
});

patientSchema.pre("save", async function (next){
  next();
});

const Patient = mongoose.model<PatientType>("Patient", patientSchema);

export default Patient;
