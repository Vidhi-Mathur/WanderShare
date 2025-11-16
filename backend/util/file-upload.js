import multer from "multer"
import { cloudinaryUpload } from './cloudinary.js';

//File type
const fileType = (req, file, cb) => {
    const allowed = ["image/png", "image/jpg", "image/jpeg", "image/webp"]
    if(allowed.includes(file.mimetype)) cb(null, true)
    else cb(null, false)
}

export const upload = multer({storage: multer.memoryStorage(), fileFilter: fileType})

export const fileUpload = async(req, res, next) => {
    try {
        if(!req.files || req.files.length === 0){
            return res.status(400).json({ message: 'No files uploaded' });
        }
        const folder = req.body.folder || 'default-folder'; 
        const uploadPromises = req.files.map(file => cloudinaryUpload(file.buffer, folder));
        const imageUrls = await Promise.all(uploadPromises);
        return res.status(200).json({ imageUrls });
    } 
    catch(err){
        next(err)
    }
};
