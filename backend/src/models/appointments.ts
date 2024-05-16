import mongoose from "mongoose";

import { HospitalType } from "../shared/types";

const AppointSchema = new mongoose.Schema({
    hospital_name: { type: String, unique: false },
    slot_date: { type: Date, unique: false },
    time_slot: { type: String, unique: false },
    location: { type: String, unique: false },
    doctor_name: { type: String, unique: false },
    token: { type: Number, unique: false },
    status:{ type: Boolean, unique: false }
});

AppointSchema.pre("save", async function (next) {
  next();
});

const Appointment = mongoose.model<HospitalType>("AppointmentType", AppointSchema);

export default Appointment;
