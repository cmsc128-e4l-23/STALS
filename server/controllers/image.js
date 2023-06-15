import fs from "fs";
import path from "path";
import multer from "multer";
import Image from "../models/Image.js";
import Accommodation from "../models/Accommodation.js";
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const savePath = "./test";
        cb(null,savePath)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
});

const upload = multer({storage: storage});

//upload Image
const uploadImage = async (req, res) => {
  try {
    let imageStrings = [];
    //replace 'images' with whatever is in the frontend form's name/id. for example, 'upload-images'.
    upload.array('images')(req, res, async  (error) => {
      if (error instanceof multer.MulterError) {
        // A Multer error occurred
        res.send({ success: false, msg: "Multer error in Image storing", error: error.message });
      } else if (error) {
        // An unknown error occurred
        res.send({ success: false, msg: "Image upload unsuccessful.", error: error.message });
      }

      // Access the uploaded files
      const files = req.files;

      // Process the files and save them in the database

      // Example: Save file paths in the database
      const imagePromises = files.map((file) => {
        let imageString = fs.readFileSync(file.path).toString('base64');
        imageStrings.push(imageString);
        fs.unlinkSync(file.path);
      });
      const updateObject = {
          $set: {photos: imageStrings}
      };
      await Accommodation.findByIdAndUpdate(
        {_id: req.body.attachedTo},
        updateObject
      );
      res.send({ success: true, msg: "Succesfully stored image to database"});
    });
  } catch (error) {
    res.send({ success: false, msg: "Image upload unsuccessful.", error: error.message });
    console.log('Image saving failed.');
  }
};

export default {
    uploadImage
}
