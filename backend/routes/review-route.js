import express from 'express'
import { createReview, getAllReviewsByPlaceId, getReviewByReviewId, deleteReviewByReviewId } from "../controllers/review-controller.js" 
import { authorizationMiddleware } from '../controllers/user-controller.js'
const router = express.Router()

router.post('/:placeId', authorizationMiddleware, createReview)

router.get('/:placeId', getAllReviewsByPlaceId)

router.get('/:reviewId', getReviewByReviewId)

router.delete('/:reviewId', authorizationMiddleware, deleteReviewByReviewId)

export default router