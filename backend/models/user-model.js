import mongoose from "mongoose"
const schema = mongoose.Schema

const user = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    places: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Place'
    }],
    reviews: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Review'
    }],
    likedPlaces: [{
        type: mongoose.Schema.ObjectId,
        ref: "Place"
    }]
})

const User = mongoose.model('User', user)
export default User