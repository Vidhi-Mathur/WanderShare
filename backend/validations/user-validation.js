import { body } from "express-validator"
import { handleValidationErrors } from "./handleValidationErrors.js"

export const signupValidation = [
    body("name").trim().notEmpty().withMessage("Name is required").bail().isString().withMessage("Name must be a string"),
    body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Invalid Email").normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').bail().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
]
export const loginValidation = [
    body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Invalid Email").normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').bail().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
]