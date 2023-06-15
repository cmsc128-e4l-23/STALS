import app from '../../app';
import makeDB from '../../mongoose.js';
import mongoose from 'mongoose';
import request from 'supertest';
import Report from "../../models/Report.js"
import Accommodation from "../../models/Accommodation.js"
import Visit from "../../models/Visit.js";

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

describe("POST", () =>{
    test("just testing", async () => {
        await request(app).post("/incNumVisits").send({
            year: 2023,
            month: 6,
            day: 29
        })

        await request(app).post("/incNumVisits").send({
            year: 2023,
            month: 5,
            day: 30
        })

        await request(app).post("/incNumVisits").send({
            year: 2022,
            month: 6,
            day: 31
        })

        await request(app).post("/incNumVisits").send({
            year: 2022,
            month: 6,
            day: 29
        })

        await request(app).post("/incNumVisits").send({
            year: 2021,
            month: 6,
            day: 30
        })
        await request(app).post("/incNumVisits").send({
            year: 2021,
            month: 5,
            day: 30
        })

        const result = (await request(app).post("/getVisits").send({})).body
        console.log(result);
        console.log(result.return);
    })
})


afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})