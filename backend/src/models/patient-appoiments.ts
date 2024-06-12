import mongoose from "mongoose";
import { PatientAppointmentType } from '../shared/types';

const patientAppointmentSchema = new mongoose.Schema<PatientAppointmentType>({
    asso_patient_id: {type: String, required: true},
    asso_appointment_id: { type: String, required: true },
    date: { type: Date, required: true },
    time_slot: { type: String, required: true },
    token_number: { type: String, required: true },
    reason: { type: String, required: true },
    details: { type: String, required: true },
});

patientAppointmentSchema.pre("save", async function (next){
  next();
});

const patientAppointment = mongoose.model<PatientAppointmentType>("patientAppointment", patientAppointmentSchema);

export default patientAppointment;
