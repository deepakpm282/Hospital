import { check } from "express-validator";

export const validation = [
    check("hospital_name", "Required").isString().notEmpty,
    check("phone_number_1", "Required").isLength({ min : 10, max: 10}).isString().withMessage("Phone number must be exactly 10 digits").notEmpty(),
    check("phone_number_2", "Required").isLength({ min : 10, max: 10}).isString().withMessage("Phone number must be exactly 10 digits").notEmpty(),
    check("date_established", "Invalid date format").matches(/^\d{2}\/\d{2}\/\d{4}$/).notEmpty(),
    check("unique_identification_number","Required").withMessage("According to IMC").notEmpty(),
    check("address", "Address is required").notEmpty(),
    check("city", "City is required").notEmpty(),
    check("state", "State is required").notEmpty(),
    check("country", "Country is required").notEmpty(),
    check("zip_code", "Invalid zip code").isPostalCode("any"),
]
export default validation