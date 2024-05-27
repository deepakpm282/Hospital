import mongoose from "mongoose";
import { PatientType } from "../shared/types";

const patientSchema = new mongoose.Schema<PatientType>({
  First_Name: { type: String, required: true },
  Last_Name: { type: String, required: true },
  Phone_Number: { type: Number, required: true },
  Email: { type: String, required: true },
  Date_Of_Birth: { type: Date, required: true },
  Gender: { type: String, required: true },
  Address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip_code: { type: Number, required: true },
});

patientSchema.pre("save", async function (next){
  next();
});

const Patient = mongoose.model<PatientType>("Doctor", patientSchema);

export default Patient;
