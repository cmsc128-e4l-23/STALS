import needle from "needle";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import FormData from "form-data";
const userId = "64415c5344582ba43b014e14";
const propertyId = "643665dccee7fa1d7dd408ea";
const url = "http://localhost:3001/uploadImage";
const imgPath = 'C:/Users/John Maui/Documents/GitHub/STALS/server/test/test.png';


const testImg = {
  userId: userId,
  attachedTo: propertyId,
  image: {
      file: imgPath,
      content_type: 'image/png'
  }
}
const form = new FormData();
form.append("userId", userId);
form.append("attachedTo", propertyId);
form.append("image", fs.createReadStream(imgPath), { filename: "test.png", contentType: "image/png" });

needle.post(url, form, function(err, result) {
    console.log("result", result.body);
});


//AHVFJGHASF HAHAHHAHA LETS FUCKING GO