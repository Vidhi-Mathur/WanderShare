import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const createReviewValidation = [
    body("rating").isInt({ min: 0, max: 5 }).withMessage("Invalid rating, should be a number between 0 & 5"),
    body("comments").trim().notEmpty().withMessage("Comment is required"),
    handleValidationErrors
]