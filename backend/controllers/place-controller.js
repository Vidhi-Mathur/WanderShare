import Place from "../models/place-model.js";
import User from "../models/user-model.js";

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

export const likeUnlikePlace = async (req, res) => {
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