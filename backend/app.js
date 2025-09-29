import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose' 
import userRoutes from './routes/user-route.js'

const app = express()

//Parsing JSON bodies
app.use(express.json({limit: '50mb'}))

//Parsing URL-encoded bodies
app.use(express.urlencoded({extended: true, limit: '50mb'}))

//Forwarding
app.use('/', userRoutes)

//Error Handling
app.use((err, req, res, next) => {
    const code = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error'; 
    return res.status(code).json({ message });
});

//Listening to server
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(3000)).catch((err) => console.log(err))