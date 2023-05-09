import needle from "needle";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

const userId = "64415c5344582ba43b014e14";
const propertyId = "643665dccee7fa1d7dd408ea";
const url = "http://localhost:3001/uploadImage";
const imgPath = 'test.png';
const testImg = {
    userId: userId,
    attachedTo: propertyId,
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