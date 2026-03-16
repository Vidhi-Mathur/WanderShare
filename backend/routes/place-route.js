import express from 'express'
import { createPlace, getAllPlaces, getPlaceByPlaceId, likeUnlikePlace, getHeatmapData, updatePlace, deletePlace, getNearbyPlaces } from '../controllers/place-controller.js'
import { authorizationMiddleware } from '../controllers/user-controller.js'
import { createPlaceValidation } from '../validations/place-validation.js'
const router = express.Router()

//POST /wandershare/place/ -> Create a new place (image upload + geotag)
router.post('/', authorizationMiddleware, createPlaceValidation, createPlace)

//GET /wandershare/place/ -> Get all places (with search, filter, and sort support)
router.get('/', getAllPlaces)

//GET /wandershare/place/heatmap -> Get data for heatmap visualization
router.get('/heatmap', getHeatmapData);

//GET /wandershare/place/nearby?lat=..&lng=.. -> Get nearby places within radius (in km) of given lat/lng
router.get('/nearby', getNearbyPlaces)

//GET /wandershare/place/:placeId -> Get single place by ID
router.get('/:placeId', getPlaceByPlaceId)

//PUT /wandershare/place/:placeId -> Update place details (only by creator)
router.put('/:placeId', authorizationMiddleware, updatePlace)

//DELETE /wandershare/place/:placeId -> Delete a place (only by creator)
router.delete('/:placeId', authorizationMiddleware, deletePlace)

//POST  /wandershare/place/:placeId/like -> Like/unlike a place
router.post('/:placeId/like', authorizationMiddleware, likeUnlikePlace)

export default router