import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

describe('POST /uploadImage', () =>{
    const userId = "64415c5344582ba43b014e14";
    const propertyId = "643665dccee7fa1d7dd408ea";
    const imgPath = path.resolve(__dirname, "./noot.png");
    const imgPath2 = path.resolve(__dirname, "./sumeru.jpg");
    const imgPath3 = path.resolve(__dirname, "./ha.jpg")
    test("Successfully upload 1 image to database.", async () => {
        const response = await request(app)
            .post("/uploadImage")
            .field('userId', userId)
            .field('attachedTo', propertyId)
            //replace 'images' with whatever is in the frontend form's name/id. for example, 'upload-images'.
            .attach('images',imgPath, 'image1.jpg');
        console.log(response.body);
        expect(response.body.success).toBe(true)
        expect(response.body.msg).toBe("Succesfully stored image to database")
    })
    test("Successfully upload a lot of images to database.", async () => {
        const response = await request(app)
            .post("/uploadImage")
            .field('userId', userId)
            .field('attachedTo', propertyId)
            .attach('images', imgPath, 'image1.jpg')
            .attach('images', imgPath2, 'image2.jpg')
            .attach('images', imgPath3, 'image3.jpg');
        console.log(response.body);
        expect(response.body.success).toBe(true)
        expect(response.body.msg).toBe("Succesfully stored image to database")
    })
})

afterAll(async () => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})