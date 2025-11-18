import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from "cloudinary";
import { PassThrough } from "stream";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

export const cloudinaryUpload = async(buffer, folder) => {
    //Promise created as Cloudinary uses a callback API.
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: "image",
            folder,
            format: "webp"
        }, (err, result) => {
            if(err) reject(err)
            else resolve(result.secure_url)
        })
        //Received buffer from multer while Cloudinary expects stream, so convert to buffer -> stream
        const stream = new PassThrough();
        stream.end(buffer);
        stream.pipe(uploadStream);
    })
}