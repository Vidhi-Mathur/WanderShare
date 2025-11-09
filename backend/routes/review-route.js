import express from 'express'
import { createReview, getAllReviewsByPlaceId } from "../controllers/review-controller.js" 
import { authorizationMiddleware } from '../controllers/user-controller.js'
const router = express.Router()

//POST /wandershare/review/:placeId -> Create a review
router.post('/:placeId', authorizationMiddleware, createReview)

//GET /wandershare/review/:placeId
router.get('/:placeId', getAllReviewsByPlaceId)

// router.get('/:reviewId', getReviewByReviewId)

// router.delete('/:reviewId', authorizationMiddleware, deleteReviewByReviewId)

export default router