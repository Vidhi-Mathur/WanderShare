const mongoose = require('mongoose')
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
    address: {
        type: String, 
        required: true
    },
    location: {
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
        default: 'https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg'
    }],
    reviews: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Review',
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Place', place)