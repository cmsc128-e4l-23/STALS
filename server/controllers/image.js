import fs from "fs";
import path from "path";
import multer from "multer";
import Image from "../models/Image.js";

const storage = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
});

const upload = multer({storage: storage});

//upload Image
const uploadImage = async (req, res) => {
    try {
        let image_details = req.body;
        console.log("ID is: " + image_details.userId);
        const newImage = new Image({
            userId: image_details.userId,
            attachedTo: image_details.propertyId,
            img: {
                data: fs.readFileSync(path.join('./images', req.file.filename)),
                contentType: 'image/png'
            }
        });
        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Image saving failed.")
    }
}

export default {
    uploadImage,
    upload // add this middleware to handle the file upload
}
