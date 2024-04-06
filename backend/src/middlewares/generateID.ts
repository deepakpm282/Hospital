const generateDoctorId = (firstName: string, lastName: string, birthDate: Date): string => {
    // Extract initials from first and last name
    const initials: string = firstName.charAt(0) + lastName.charAt(0);
  
    // Extract year and month from birthdate
    const year: string = birthDate.getFullYear().toString().slice(-2);
    const month: string = (birthDate.getMonth() + 1).toString().padStart(2, '0');
  
    // Generate a random 3-digit number
    const randomNum: string = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
    // Combine all parts to form the Doctor ID
    const doctorId: string = `${initials}${year}${month}${randomNum}`;
  
    return doctorId;
  };
  
  export default generateDoctorId;
  