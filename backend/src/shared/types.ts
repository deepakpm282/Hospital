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

export type HospitalType = {
  _id: string;
  hospital_name: string;
  phone_number_1: number;
  phone_number_2: number;
  email: string;
  password: string;
  confirm_password: string;
  date_established: string;
  unique_identification_number: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  isVerified: boolean;
};

export type AppointmentType = {
  _id: string;
  Hospital_id: string;
  hospital_name: string;
  slot_date: Date;
  time_slot: string;
  location: string;
  doctor_name: string;
  token: number;
};
