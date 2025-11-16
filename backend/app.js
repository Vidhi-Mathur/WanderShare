import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose' 
import userRoutes from './routes/user-route.js'
import placeRoutes from "./routes/place-route.js"
import reviewRoutes from "./routes/review-route.js"
import cors from "cors"
import { fileUpload, upload } from './util/file-upload.js'
import { authorizationMiddleware } from './controllers/user-controller.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

//Forwarding
app.post('/upload-image', authorizationMiddleware, upload.array('images', 6), fileUpload);

//Parsing JSON bodies
app.use(express.json({limit: '50mb'}))

//Parsing URL-encoded bodies
app.use(express.urlencoded({extended: true, limit: '50mb'}))

app.use('/user', userRoutes)
app.use('/place', placeRoutes)
app.use('/review', reviewRoutes)

//Error Handling
app.use((err, req, res, next) => {
    const code = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error'; 
    return res.status(code).json({ message });
});

//Listening to server
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(3000)).catch(() => process.exit(1))