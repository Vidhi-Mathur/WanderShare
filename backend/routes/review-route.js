import express from 'express'
import { createReview, getAllReviewsByPlaceId } from "../controllers/review-controller.js" 
import { authorizationMiddleware } from '../controllers/user-controller.js'
import { createReviewValidation } from '../validations/review-validation.js'
const router = express.Router()

//POST /wandershare/review/:placeId -> Create a review
router.post('/:placeId', authorizationMiddleware, createReviewValidation, createReview)

//GET /wandershare/review/:placeId
router.get('/:placeId', getAllReviewsByPlaceId)

export default router