import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const createPlaceValidation = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("location.address").trim().notEmpty().withMessage("Address is required"),
    body("location.latitude").isFloat().withMessage("Latitude must be a number"),
    body("location.longitude").isFloat().withMessage("Longitude must be a number"),
    body("images").isArray({ min: 1, max: 6 }).withMessage("At least one image is required"),
    body("images.*").isString().withMessage("Image must be a string URL"),
    handleValidationErrors
]