import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type DoctorType = {
  _id: string;
  DocId: string;
  associated_hos_id: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
  degrees: string;
  registration_number: string;
  year_of_registration: number;
  state_medical_council: string;
  experience: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: number;
  photo_Url: string;
  isApproved: boolean;
};

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
