import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

export const cloudinaryUpload = async(localStoragePath, folder) => {
    try {
        if(!localStoragePath) return null;
        const response = await cloudinary.uploader.upload(localStoragePath, {
            resource_type: "image",
            folder,
            format: "webp"
        });
        return response
    }
    catch(err) {
        //Remove temporary saved file as upload failed
        fs.unlinkSync(localStoragePath)
        return null
    }
}