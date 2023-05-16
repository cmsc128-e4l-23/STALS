import needle from "needle";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
const userId = "64415c5344582ba43b014e14";
const propertyId = "643665dccee7fa1d7dd408ea";
const url = "http://localhost:3001/uploadImage";
const imgPath = './test.jpg';
const imgPath2 = './test.jpg';
const formData = new FormData();
formData.append('userId', userId);
formData.append('attachedTo', propertyId);
formData.append('images', fs.createReadStream(imgPath), {
  filename: 'image1.jpg',
  contentType: 'image/jpeg',
});
formData.append('images', fs.createReadStream(imgPath2), {
  filename: 'image2.jpg',
  contentType: 'image/jpeg',
});
fetch(url, {
  method: 'POST',
  body: formData,
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
