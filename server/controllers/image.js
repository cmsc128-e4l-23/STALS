import fs from "fs";
import path from "path";
import multer from "multer";
import Image from "../models/Image.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
});

const upload = multer({storage: storage});

//upload Image
const uploadImage = async (req, res) => {
  try {
    upload.array('images')(req, res, async  (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // An unknown error occurred
        return res.status(500).json({ error: err.message });
      }

      // Access the uploaded files
      const files = req.files;

      // Process the files and save them in the database

      // Example: Save file paths in the database
      const imagePromises = files.map(async (file) => {
        const image = new Image({
            userId: req.body.userId,
            attachedTo: req.body.attachedTo,
            img: {
                data: fs.readFileSync(file.path),
                contentType: file.mimetype,
            },
        });
        await image.save();
        fs.unlinkSync(file.path);
        return image;
      });
      const uploadedImages = await Promise.all(imagePromises);

      res.status(200).json({ message: 'Images uploaded successfully', uploadedImages });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Image saving failed.');
  }
};

export default {
    uploadImage
}
