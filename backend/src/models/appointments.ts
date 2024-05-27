import mongoose from "mongoose";
import { AppointmentType } from "../shared/types";

const AppointSchema = new mongoose.Schema({
    Hospital_Id: { type: String, unique: false },
    Hospital_Name: { type: String, unique: false },
    Slot_Date: { type: Date, unique: false },
    Time_Slot: { type: String, unique: false },
    Location: { type: String, unique: false },
    Doctor_Name: { type: String, unique: false },
    Doctor_Id: { type: String, unique: false},
   Token: { type: Number, unique: false },
});

AppointSchema.pre("save", async function (next) {
  next();
});

const Appointment = mongoose.model<AppointmentType>("Appointment", AppointSchema);

export default Appointment;
