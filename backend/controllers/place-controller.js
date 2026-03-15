import Place from "../models/place-model.js";
import Review from "../models/review-model.js";
import User from "../models/user-model.js";
import { cloudinaryDelete } from "../util/cloudinary.js";

export const createPlace = async(req, res, next) => {
    try {
        const { name, description, location, images } = await req.body;
        const creatorId = await req.user._id;
        const existingCreator = await User.findById(creatorId);
        if(!existingCreator){
            return res.status(404).json({message: "Failed to find user, try login again."})
        }
        const newPlace = new Place({
            name,
            creator: creatorId,
            description,
            location: {
                address: location.address,
                lat: location.latitude,
                long: location.longitude
            },
            images
        });
        await newPlace.save()
        existingCreator.places.push(newPlace._id)
        await existingCreator.save()
        res.status(200).json({ message: "Place created successfully." })
    } 
    catch(err){
        next(err)
    }
}

export const getAllPlaces = async(req, res, next) => {
    try {
        //Extract query parameters from URL
        const { search, sortBy, filterDate, filterRating } = req.query;
        const matchQuery = {};
        if(search){
            //or to match multiple fields
            matchQuery.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ]
        }
        if(filterDate && filterDate !== "all"){
            const now = new Date();
            let startDate, endDate;
            switch(filterDate){
                case "today":
                    startDate = new Date(now.setHours(0, 0, 0, 0));
                    endDate = new Date();
                    break;
                case "thisMonth":
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                    break;
                case "thisYear":
                    startDate = new Date(now.getFullYear(), 0, 1);
                    endDate = new Date(now.getFullYear() + 1, 0, 1);
                    break;
                case "beforeThat":
                    startDate = new Date(0); 
                    endDate = new Date(now.getFullYear(), 0, 1);
                    break;
            }
            //Lies in range
            if(startDate && endDate){
                matchQuery.createdAt = { $gte: startDate, $lt: endDate };
            }
        }
        //1: ascending, -1: descending
        let sortOption = { createdAt: -1 };
        switch(sortBy){
            case "oldest":
                sortOption = { createdAt: 1 };
                break;
            case "ratingHigh":
                sortOption = { avgRating: -1 };
                break;
            case "ratingLow":
                sortOption = { avgRating: 1 };
                break;
            case "likesMost":
                sortOption = { likesCount: -1 };
                break;
            case "likesLeast":
                sortOption = { likesCount: 1 };
                break;
        }
        const pipeline = [{ $match: matchQuery }, {
            //Joining with another collection "Review"
            $lookup: {
                from: "reviews",
                //In Place, we have Place.reviews[]
                localField: "reviews",
                foreignField: "_id",
                as: "reviewDetails",
            }}, {
            //Add extra two computed fields, average rating and likes count
            $addFields: {
                avgRating: { $avg: "$reviewDetails.rating" },
                likesCount: { $size: "$likes" },
            }}
        ]
        //Keep only whose places where avgRating >= filterRating
        if(filterRating && filterRating !== "all"){
            pipeline.push({
                $match: {
                    avgRating: { $gte: Number(filterRating) },
                },
            });
        }
        //Sort (done later so if options chose = likes/ rating)
        pipeline.push({ $sort: sortOption });
        //Aggregate and return computed places
        const places = await Place.aggregate(pipeline);
        res.status(200).json({ places });
    } 
    catch(err){
        next(err)
    }
};

export const getPlaceByPlaceId = async(req, res, next) => {
    try {
        const { placeId } = req.params
        const existingPlace = await Place.findById(placeId).populate({ 
            //Place.creator = User, get name from it
            path: "creator", 
            select: "name"
        }).populate({
            //Place.review = Review, select rating, comment, createdAt and reviewer from it.
            //Review.reviewer = User, select name from it
            path: "reviews",
            select: "rating comment createdAt reviewer",
            populate: {
                path: "reviewer",
                select: "name",
            }
        });
        if (!existingPlace) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json({ place: existingPlace });
    }
    catch(err){
        next(err)
    }
};

export const likeUnlikePlace = async(req, res, next) => {
  try {
        const userId = req.user._id; 
        const { placeId } = req.params;
        const existingPlace = await Place.findById(placeId);
        if(!existingPlace){
            return res.status(404).json({ message: "Place not found" });
        }
        const existingUser = await User.findById(userId);
        if(!existingUser){
            return res.status(404).json({ message: "User not found" });
        }
        let liked;
        //Already liked, so unline
        if(existingPlace.likes.includes(userId)){
            //Unlike
            existingPlace.likes.pull(userId);
            existingUser.likedPlaces.pull(placeId);
            liked = false;
        } 
        //Not liked, so like
        else {
          existingPlace.likes.push(userId);
          existingUser.likedPlaces.push(placeId);
          liked = true;
        }
        await existingPlace.save();
        await existingUser.save();
        res.status(200).json({ message: liked? "Place liked" :"Place unliked", liked, likesCount: existingPlace.likes.length })
    }     
    catch(err){
        next(err)
    }
};

export const getHeatmapData = async (req, res, next) => {
    try {
        const places = await Place.find({}, "location likes reviews");
        const heatmapPoints = places.map(place => {
            const likeWeight = place.likes?.length || 0;
            const reviewWeight = place.reviews?.length || 0;
            //Base weight + engagement
            const intensity = 1 + likeWeight + reviewWeight;
            return [ place.location.lat, place.location.long, intensity ];
        });
        res.status(200).json({ points: heatmapPoints });
    } 
    catch(err){
        next(err)
    }
}

export const updatePlace = async(req, res, next) => {
    try {
        const { placeId } = req.params;
        const userId = req.user._id;
        const { name, description, location, images } = req.body;
        const existingPlace = await Place.findById(placeId);
        if(!existingPlace){
            return res.status(404).json({ message: "Place not found" });
        }
        if(existingPlace.creator.toString() !== userId.toString()){
            return res.status(403).json({ message: "Not authorized to update this place" });
        }
        const removedImages = existingPlace.images.filter(img => !images.includes(img));
        //Delete removed images from Cloudinary
        for(const imageUrl of removedImages) {
            await cloudinaryDelete(imageUrl);
        }
        if(name) existingPlace.name = name;
        if(description) existingPlace.description = description;
        if(location){
            existingPlace.location = {
                address: location.address,
                lat: location.latitude,
                long: location.longitude
            };
        }
        if(images) existingPlace.images = images;
        await existingPlace.save();
        res.status(200).json({ message: "Place updated successfully", place: existingPlace })
    }
    catch(err){
        next(err);
    }
};

export const deletePlace = async(req, res, next) => {
    try {
        const { placeId } = req.params;
        const userId = req.user._id;
        const existingPlace = await Place.findById(placeId);
        if(!existingPlace){
            return res.status(404).json({ message: "Place not found" });
        }
        if(existingPlace.creator.toString() !== userId.toString()){
            return res.status(403).json({ message: "Not authorized to delete this place" });
        }
        await User.findByIdAndUpdate(userId,{ $pull: { places: placeId } });
        await Review.deleteMany({ _id: { $in: existingPlace.reviews } });
        await Place.findByIdAndDelete(placeId);
        for(const imageUrl of existingPlace.images){
            await cloudinaryDelete(imageUrl);
    }
        res.status(200).json({ message: "Place deleted successfully" });
    }
    catch(err){
        next(err);
    }
};

export const getNearbyPlaces = async (req, res, next) => {
    try {
        const { lat, lng, zoom } = req.query;
        if(!lat || !lng){
            return res.status(400).json({ message: "Coordinates required" });
        }
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const zoomLevel = parseInt(zoom)
        let radius = 5
        if(zoomLevel <= 4) radius = 500
        else if(zoomLevel <= 6) radius = 200
        else if(zoomLevel <= 8) radius = 100
        else if(zoomLevel <= 10) radius = 50
        else if(zoomLevel <= 12) radius = 25
        else if(zoomLevel <= 14) radius = 10
        const places = await Place.find();
        const nearbyPlaces = places.filter((place) => {
            const distance = getDistance(latitude, longitude, place.location.lat, place.location.long);
            return distance <= radius; 
        });
        res.status(200).json({ places: nearbyPlaces });
    } 
    catch(err){
        next(err)
    }
}


const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
