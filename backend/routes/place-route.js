import express from 'express'
import { createPlace, getAllPlaces, getPlaceByPlaceId, likeUnlikePlace } from '../controllers/place-controller.js'
import { authorizationMiddleware } from '../controllers/user-controller.js'
const router = express.Router()

//POST /wandershare/place/ -> Create a new place (image upload + geotag)
router.post('/', authorizationMiddleware, createPlace)

//GET /wandershare ->	Get all places (with search, filter, and sort support)
router.get('/', getAllPlaces)

//GET /wandershare/:placeId -> Get single place by ID
router.get('/:placeId', getPlaceByPlaceId)

// //DELETE  /wandershare/:placeId -> Delete a place (only by creator)
// router.delete('/:placeId', authorizationMiddleware, deletePlaceByPlaceId)

// //POST	/wandershare/:placeId/like -> Like/unlike a place
router.post('/:placeId/like', authorizationMiddleware, likeUnlikePlace)

// //GET  /wandershare/user/:userId -> Get all places created by a specific user
// router.get('/user/:userId', getPlacesByUserId)

export default router