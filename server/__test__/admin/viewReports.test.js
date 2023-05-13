import app from '../../app';
import makeDB from '../../mongoose.js';
import mongoose from 'mongoose';
import request from 'supertest';
import Report from "../../models/Report.js"
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

describe("POST /viewReports", () =>{
    
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})