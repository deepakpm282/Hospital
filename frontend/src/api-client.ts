import { signInFormData } from './pages/Authentication/SignIn';
import { RegisterFormData } from './pages/Authentication/SignUp';
import { AddDoctorFormData } from './components/Doctor/Adddoctor';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const hospitalRegister = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/hospitalRegister`, {
    method: 'POST',
    credentials: 'include', // to add http cookie while we are registering
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const doctorRegister = async (formData: AddDoctorFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/docs/doctorRegister`, {
    method: 'POST',
    credentials: 'include', // to add http cookie while we are registering
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: signInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/hospitalLogin`, {
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

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Token Invalid');
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Error during signout.!');
  }
};

