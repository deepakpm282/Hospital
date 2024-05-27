import mongoose from "mongoose";
import { DepartmentType } from "../shared/types";

const departmentSchema = new mongoose.Schema({
  Department_Name: { type: String, unique: false },
  Phone_Number: { type: Number, unique: true },
  Email: { type: String, unique: true },
  Services: { type: String },
  Facilities: { type: String },
  About: { type: String },
  Additional: { type: String },
  Associated_Hos_Id: { type: String},
});

departmentSchema.pre("save", async function (next) {
  next();
});

const Department = mongoose.model<DepartmentType>("Department", departmentSchema);

export default Department;
