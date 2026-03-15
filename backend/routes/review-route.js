import express from 'express'
import { createReview, deleteReview, getAllReviewsByPlaceId, updateReview } from "../controllers/review-controller.js" 
import { authorizationMiddleware } from '../controllers/user-controller.js'
import { createReviewValidation } from '../validations/review-validation.js'
const router = express.Router()

//POST /wandershare/review/:placeId -> Create a review
router.post('/:placeId', authorizationMiddleware, createReviewValidation, createReview)

//GET /wandershare/review/:placeId
router.get('/:placeId', getAllReviewsByPlaceId)

//PUT /wandershare/review/:reviewId -> Update a review (only by reviewer)
router.put('/:reviewId', authorizationMiddleware, updateReview)

//DELETE /wandershare/review/:reviewId -> Delete a review (only by reviewer)
router.delete('/:reviewId', authorizationMiddleware, deleteReview)

export default router