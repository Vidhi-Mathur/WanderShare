import mongoose from "mongoose"
const schema = mongoose.Schema

const review = new schema({
    place: {
        type: mongoose.Schema.ObjectId,
        ref: 'Place',
        required: true
    },
    reviewer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comment: {
        type: String
    }
}, { timestamps: true })

const Review = mongoose.model('Review', review)
export default Review
