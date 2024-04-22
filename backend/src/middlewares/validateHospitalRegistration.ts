import { check } from "express-validator";

export const validateHos = [
    check("hospital_name", "Required").isString(),
    check("phone_number_1", "Required").isLength({ min : 10, max: 10}).isString(),
    check("phone_number_2", "Required").isLength({ min : 10, max: 10}).isString(),
    check("date_established", "Invalid date format").isDate(),
    check("unique_identification_number","Required"),
    check("address", "Address is required"),
    check("city", "City is required"),
    check("state", "State is required"),
    check("country", "Country is required"),
    check("zip_code", "Invalid zip code"),
]
export default validateHos