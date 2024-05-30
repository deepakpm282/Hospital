import { Hospital_Login_Data } from './pages/Authentication/SignIn';
import { Hospital_SignUp_Data } from './pages/Authentication/SignUp';
import { DepartmentType, DoctorType } from '../../backend/src/shared/types';
import { HospitalType } from '../../backend/src/shared/types';
import { Appointment_Data } from './components/Tables/Appoint';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const Hospital_SignUp = async (formData: Hospital_SignUp_Data) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/hospital-signup`,
    {
      method: 'POST',
      credentials: 'include', //to add http cookie while we are registering
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    },
  );

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const Hospital_Register = async (formData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/hospital-register`,
    {
      method: 'POST',
      credentials: 'include', // to add http cookie while we are registering
      body: formData,
    },
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const Appointment_Booking = async (formData: Appointment_Data) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/appointment-booking`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    },
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const createDepartment = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hospitals/departments`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to create department');
  }
  return response.json();
};

export const Add_Doc_To_Hos = async (docFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/doctors/doctor-register`, {
    method: 'POST',
    credentials: 'include', // to add http cookie while we are registering
    body: docFormData,
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const Hospital_Login = async (formData: Hospital_Login_Data) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/hospital-login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const fetchDoctors = async (): Promise<DoctorType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hospitals/get-allDocs`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const fetchDepartments = async (
  associated_hos_id: string,
): Promise<DepartmentType[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/get-allDeps?id=${associated_hos_id}`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const body = await response.json();
  if (!response) {
    throw new Error(body.message);
  }
  return body;
};

export const fetchDocData = async (
  hospital_id: string,
): Promise<DoctorType[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/get-doctor?id=${hospital_id}`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const fetchHosData = async (
  hospital_id: string,
): Promise<HospitalType[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/get-HosName?id=${hospital_id}`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const fetchDocById = async (DocId: string): Promise<DoctorType> => {
  const response = await fetch(`${API_BASE_URL}/api/hospitals/${DocId}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Error Fetching Doctor');
  }
  return response.json();
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Token Invalid');
  }

  return response.json();
};

export const Sign_Out = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Error during signout.!');
  }
};
