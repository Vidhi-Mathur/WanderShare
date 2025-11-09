import Place from "../models/place-model.js"
import Review from "../models/review-model.js"
import User from "../models/user-model.js"

export const createReview = async(req, res, next) => {
    const { rating, comment } = req.body
    const { placeId } = req.params
    const userId = req.user._id 
    try {
        if(!rating || rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 0 and 5" })
        }
        const existingPlace = await Place.findById(placeId)
        if(!existingPlace) {
            return res.status(404).json({ message: "Place not found" })
        }
        const existingUser = await User.findById(userId)
        if(!existingUser){
            return res.status(404).json({ message: "User not found" })
        }
        //Create review
        const newReview = await Review.create({
            place: placeId,
            reviewer: userId,
            rating,
            comment
        })
        //Associate with both placr and user
        await Place.findByIdAndUpdate(placeId, { 
            $push: { 
                reviews: newReview._id 
            }
        })
        await User.findByIdAndUpdate(userId, { 
            $push: { 
                reviews: newReview._id 
            } 
        })
        res.status(201).json({ message: "Review added successfully" })
    } 
    catch(err){
        next(err)
    }
}
export const getAllReviewsByPlaceId = async(req, res, next) => {
    const { placeId } = req.params
    try {
        const existingPlace = await Place.findById(placeId)
        if(!existingPlace){
            return res.status(404).json({ message: "Place not found" })
        }
        const reviews = await Review.find({ place: placeId }).populate("reviewer", "name").sort({ createdAt: -1 })
        return res.status(200).json({ reviews })
    } 
    catch(err){
        console.error("Error fetching reviews:", error)
        return res.status(500).json({ message: "Failed to fetch reviews" })
    }
}