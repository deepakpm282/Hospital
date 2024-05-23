import mongoose from "mongoose";
import { AppointmentType } from "../shared/types";

const AppointSchema = new mongoose.Schema({
    Hospital_id: { type: String, unique: true },
    hospital_name: { type: String, unique: false },
    slot_date: { type: Date, unique: false },
    time_slot: { type: String, unique: false },
    location: { type: String, unique: false },
    doctor_name: { type: String, unique: false },
    token: { type: Number, unique: false },
});

AppointSchema.pre("save", async function (next) {
  next();
});

const Appointment = mongoose.model<AppointmentType>("Appointment", AppointSchema);

export default Appointment;
