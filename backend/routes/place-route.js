import express from 'express'
import { createPlace, getAllPlaces, getPlaceByPlaceId, likeUnlikePlace, getHeatmapData, updatePlace, deletePlace } from '../controllers/place-controller.js'
import { authorizationMiddleware } from '../controllers/user-controller.js'
import { createPlaceValidation } from '../validations/place-validation.js'
const router = express.Router()

//POST /wandershare/place/ -> Create a new place (image upload + geotag)
router.post('/', authorizationMiddleware, createPlaceValidation, createPlace)

//GET /wandershare -> Get all places (with search, filter, and sort support)
router.get('/', getAllPlaces)

//GET /wandershare/heatmap -> Get data for heatmap visualization
router.get('/heatmap', getHeatmapData);

//GET /wandershare/:placeId -> Get single place by ID
router.get('/:placeId', getPlaceByPlaceId)

//PUT /wandershare/:placeId -> Update place details (only by creator)
router.put('/:placeId', authorizationMiddleware, updatePlace)

router.delete('/:placeId', authorizationMiddleware, deletePlace)

//POST  /wandershare/:placeId/like -> Like/unlike a place
router.post('/:placeId/like', authorizationMiddleware, likeUnlikePlace)

export default router