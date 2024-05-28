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
  Hospital_Id: string;
  Hospital_Name: string;
  Slot_Date: Date;
  Time_Slot: string;
  Location: string;
  Doctor_Name: string;
  Doctor_Id: string;
  Token: number;
};

export type DepartmentType = {
  _id: string;
  Department_Name: string;
  Phone_Number: number;
  Email: string;
  Services: string[];
  Facilities: string[];
  About: string;
  Additional: string;
  Associated_Hos_Id: string;
};

export type PatientType = {
  _id: string;
  Google_Id: string;
  First_Name: string;
  Last_Name: string;
  Phone_Number: number;
  Email: string;
  Date_Of_Birth: Date;
  Gender: string;
  Address: string
  City: string;
  State: string;
  Country: string;
  Zip_code: number;
};
