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
        const result = await request(app).post("/incNumVisits").send({
            year: 2023,
            month: 5,
            day: 29
        })

        expect(result.body.success).toBe(true);
        expect(result.body.msg).toBe("incrementing visits succeeded");

        await request(app).post("/incNumVisits").send({
            year: 2023,
            month: 5,
            day: 30
        })

        await request(app).post("/incNumVisits").send({
            year: 2023,
            month: 3,
            day: 31
        })

        const result3 = await request(app).post("/getVisits").send({
            year: 2023,
            month: 7
        })

        console.log(result3.body.return);
    })
    
    // test("Correct input for resolveReport method", async () =>{
    //     const reportBefore = await Report.findOne({content: "The place is dirty."})
    //     expect(reportBefore.status).toBe("Pending");
    //     const result = await request(app).post("/resolveReport").send({_id: reportBefore._id});
    //     expect(result.body.success).toBe(true);
    //     expect(result.body.msg).toBe("Resolving succeeded");
    //     const reportAfter = await Report.findOne({content: "The place is dirty."})
    //     expect(reportAfter.status).toBe("Resolved");
    // })

    // test("No input for resolveReport method", async () =>{
    //     const result = await request(app).post("/resolveReport").send({})
    //     expect(result.body.success).toBe(false);
    //     expect(result.body.msg).toBe("Resolved no reports");
    // })

    // test("Wrong input for resolveReport method", async () =>{
    //     const result = await request(app).post("/resolveReport").send({_id: "IDeeeeeee"})
    //     expect(result.body.success).toBe(false);
    //     expect(result.body.msg).toBe("Resolving failed");
    // })
})


afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})