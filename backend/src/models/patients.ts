import mongoose from "mongoose";
import { PatientType } from "../shared/types";

const patientSchema = new mongoose.Schema<PatientType>({
  Google_Id: {type: String, required: true},
  First_Name: { type: String, required: true },
  Last_Name: { type: String, required: true },
  Phone_Number: { type: Number, required: true },
  Email: { type: String, required: true },
  Date_Of_Birth: { type: Date, required: true },
  Gender: { type: String, required: true },
  Address: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Country: { type: String, required: true },
  Zip_code: { type: Number, required: true },
});

patientSchema.pre("save", async function (next){
  next();
});

const Patient = mongoose.model<PatientType>("Patient", patientSchema);

export default Patient;
