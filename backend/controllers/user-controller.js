import dotenv from 'dotenv'
import User from '../models/user-model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dotenv.config()

//Set expiration time
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d'})
}

export const postSignup = async(req, res, next) => {
    try {
        const { name, email, password } = req.body
        let existingUser = await User.findOne({ email: email.toLowerCase() })
        //User already exists
        if(existingUser){
            return res.status(409).json({ message: 'User already exists, try login instead' })
        }
        let hashedPassword = await bcrypt.hash(password, 12)
        //Create user
        let newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        })
        //Generating token
        let token = generateToken({ _id: newUser._id })
        await newUser.save()
        res.status(200).json({ token, user: existingUser })
    }
    catch(err) {
        next(err)
    }
}

export const postLogin = async(req, res, next) => {
    try {
        const { email, password } = req.body
        let existingUser = await User.findOne({ email: email.toLowerCase() })
        //Email doesn't exist, so signup
        if(!existingUser){
            return res.status(404).json({ message: 'No User found. Try signup instead' })
        }
        //Compare and check if valid or not
        let validPassword = await bcrypt.compare(password, existingUser.password)
        if(!validPassword){
            return res.status(401).json({ message: 'Incorrect password' })
        }
        //Generating token
        let token = generateToken({ _id: existingUser._id })
        await existingUser.save()
        res.status(200).json({ token, user: existingUser })
    }
    catch(err){
        next(err)
    }
}
export const postLogout = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Logged out successfully" });
    } 
    catch(err){
        next(err)
    }
};

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params
    const existingUser = await User.findById(userId).populate({
        //3 populate(), as User has 3 relational fields, places[], likedPlaces[] and reviews[]
        //User.places[] has placeIDs, replace with full Place objects, same for User.likedPlaces[] and User.reviews[] so could contain rating, comment etc
        path: "places",
        select: "name images location description likes createdAt reviews",
        populate: {
            path: "reviews",
            select: "rating comment reviewer",
        }}).populate({
        path: "likedPlaces",
        select: "name images location description likes reviews",
        populate: {
            path: "reviews",
            select: "rating comment reviewer",
        }}).populate({
        path: "reviews",
        populate: {
            path: "place",
            select: "name location",
        }
    })
    if(!existingUser){
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: existingUser });
    } 
    catch(err){
        res.status(500).json({ message: "Failed to fetch user profile" });
    }
};

export const authorizationMiddleware = async(req, res, next) => {
    try {
        //No authorization header set
        let authorization = await req.headers.authorization
        if(!authorization) return res.status(401).json({ message: 'Unauthorized' })
        //Not a token
        let token = await authorization.split(' ')[1]
        if(!token) return res.status(401).json({ message: 'Unauthorized' })
        //Verify
        let decodedToken
        try {
            decodedToken = await jwt.verify(token, process.env.SECRET_KEY)
        }
        catch(err){
            if(err instanceof jwt.TokenExpiredError){
                return res.status(401).json({ message: 'Token expired' })
            }
            return res.status(401).json({ message: 'Invalid token' })
        }
        //Attaching authenticated user’s identity, can extract userId from it without needing the token again (now we know user is verified, so no need of token till expiration)
        req.user = decodedToken
        next()
    }
    catch(err){
        next(err)
    }
}