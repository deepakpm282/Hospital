export const generateDoctorPass = (birthDate: Date | string): string => {
  // Convert birthDate to a Date object if it's not already
  if (typeof birthDate === "string") {
    birthDate = new Date(birthDate);
  }

  // Extract year, month, and day from birthdate
  const year: string = birthDate.getFullYear().toString();
  const month: string = (birthDate.getMonth() + 1).toString().padStart(2, "0");
  const day: string = birthDate.getDate().toString().padStart(2, "0");

  // Combine all parts to form the Doctor ID
  const doctorId: string = `${year}${month}${day}`;

  return doctorId;
};

export default generateDoctorPass;
