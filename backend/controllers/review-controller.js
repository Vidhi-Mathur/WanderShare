import Place from "../models/place-model.js"
import Review from "../models/review-model.js"
import User from "../models/user-model.js"

export const createReview = async(req, res, next) => {
    const { rating, comment } = req.body
    const { placeId } = req.params
    const userId = req.user._id 
    try {
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
        await Place.findByIdAndUpdate(placeId, { $push: { reviews: newReview._id }})
        await User.findByIdAndUpdate(userId, { $push: { reviews: newReview._id }})
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
        return res.status(500).json({ message: "Failed to fetch reviews" })
    }
}

export const updateReview = async(req, res, next) => {
    try {
        const { reviewId } = req.params
        const { rating, comment } = req.body
        const userId = req.user._id
        const existingReview = await Review.findById(reviewId)
        if(!existingReview) {
            return res.status(404).json({ message: "Review not found" })
        }
        if(!existingReview.reviewer.equals(userId)){
            return res.status(403).json({ message: "Not authorized to update this review" })
        }
        if(rating) existingReview.rating = rating
        if(comment) existingReview.comment = comment
        await existingReview.save()
        res.status(200).json({ message: "Review updated successfully", review: existingReview })
    } 
    catch(err){
        next(err)
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params
        const userId = req.user._id
        const existingReview = await Review.findById(reviewId)
        if(!existingReview){
            return res.status(404).json({ message: "Review not found" })
        }
        if(!existingReview.reviewer.equals(userId)){
            return res.status(403).json({ message: "Not authorized to delete this review" })
        }
        const placeId = existingReview.place
        await Place.findByIdAndUpdate(placeId, { $pull: { reviews: reviewId }})
        await User.findByIdAndUpdate(userId, { $pull: { reviews: reviewId }})
        await Review.findByIdAndDelete(reviewId)
        res.status(200).json({ message: "Review deleted successfully" })
    } 
    catch(err){
        next(err)
    }
}