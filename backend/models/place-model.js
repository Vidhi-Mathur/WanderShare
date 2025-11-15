import mongoose from "mongoose"
const schema = mongoose.Schema

const place = new schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    location: {
        address: {
            type: String, 
            required: true
        },
        lat: {
            type: Number, 
            required: true
        },
        long:{
            type: Number, 
            required: true
        } 
    },
    creator: { 
        type: mongoose.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    images: [{
        type: String,
        required: true,
        min: 1,
        max: 6
    }],
    reviews: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Review',
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

const Place = mongoose.model('Place', place)
export default Place