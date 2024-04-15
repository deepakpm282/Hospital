import { Hospital_Login_Data } from './pages/Authentication/SignIn';
import { Hospital_SignUp_Data } from './pages/Authentication/SignUp';

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

  console.log('response', responseBody);

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const Hospital_Register = async (HosFormData: FormData) => {
  console.log('JSON.stringify(HosFormData) >>> ', JSON.stringify(HosFormData));

  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/hospital-register`,
    {
      method: 'POST',
      credentials: 'include', // to add http cookie while we are registering
      body: HosFormData,
    },
  );
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

export const Add_Doc_To_Hos = async (docFormData: FormData) => {
  console.log(docFormData);
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
