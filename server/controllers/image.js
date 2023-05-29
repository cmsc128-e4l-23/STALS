import fs from "fs";
import path from "path";
import multer from "multer";
import Image from "../models/Image.js";
import Accommodation from "../models/Accommodation.js";
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const savePath = "../client/stals/src/assets";
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
    let imageIds = [];
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
      const imagePromises = files.map(async (file) => {
        const image = new Image({
            userId: req.body.userId,
            attachedTo: req.body.attachedTo,
            filename: file.filename,
            img: {
                data: fs.readFileSync(file.path),
                contentType: file.mimetype,
            },
        });
        let savedImage = await image.save();
        //fs.unlinkSync(file.path);
        return image;
      });
      const uploadedImages = await Promise.all(imagePromises);
      for(let i = 0; i < uploadedImages.length; i++){
        imageIds[i] = uploadedImages[i].filename;
      }
      let currAccomm = await Accommodation.findById(req.body.attachedTo);
      const updateObject = {
          $set: {photos: imageIds}
      };
      await Accommodation.findByIdAndUpdate(
        {_id: req.body.attachedTo},
        updateObject
    );

      res.send({ success: true, msg: "Succesfully stored image to database", imageIds: imageIds});
    });
  } catch (error) {
    res.send({ success: false, msg: "Image upload unsuccessful.", error: error.message });
    console.log('Image saving failed.');
  }
};

export default {
    uploadImage
}
