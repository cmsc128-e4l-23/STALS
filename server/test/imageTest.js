import needle from "needle";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
const userId = "64415c5344582ba43b014e14";
const propertyId = "643665dccee7fa1d7dd408ea";
const url = "http://localhost:3001/uploadImage";
const dirname = path.resolve();
const imgPath = path.join(dirname,'test.png');
const testImg = {
    imgID: new mongoose.Types.ObjectId(),
    userID: userId,
    accommodationID: propertyId,
    image: {
        file: fs.readFileSync(imgPath),
        content_type: 'image/png'
    }
};

needle.post(url, testImg, { json: true }, (err, res, body) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res.body);
    console.log("Image uploaded");
  }
});
