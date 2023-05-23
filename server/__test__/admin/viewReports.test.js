import app from '../../app';
import makeDB from '../../mongoose.js';
import mongoose from 'mongoose';
import request from 'supertest';
import Report from "../../models/Report.js";
import Accommodation from "../../models/Accommodation.js";
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

const signup_details = {
    userType: "Student",
    firstName: "Player 1",
    lastName: "Blank",
    email: "p1blank@up.edu.ph",
    password: "player1blank",
    phoneNumber: "09123456789",
    birthday: "2002-05-07",
    sex: "Male"
}

var accomm_details = {
    name: "White House",
    owner: "p1blank@up.edu.ph",
    landmarks: ["Raymundo Gate"],
    address: {
        postCode: "1234",
        street: "Street 10",
        barangay: "Barangay 11",
        city: "City 12",
        province: "Laguna",
        region: "CALABARZON"
    },
    generalLocation: 1,
    accommodationType: "Transient",
    amenities: "Free Wi-Fi",
    priceRange: {
        minPrice: 5000,
        maxPrice: 10000
    },
    description: "A place to stay at!",
    photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
    restrictions: ["no visitors allowed"]
};

describe("POST /viewReports", () => {
    it("test if the database is initialized for testing", async () => {
        const user = await request(app).post("/signup").send(signup_details)
        await request(app).post("/addAccomm").send(accomm_details)
        const accommData = await Accommodation.findOne({ name: "White House" });
        await request(app).post("/reportAccomm").send({
            user: user.body.data.email,
            reported_id: accommData._id,
            classification: "Accommodation",
            content: "The place is dirty."
        })
        await request(app).post("/reportAccomm").send({
            user: user.body.data.email,
            reported_id: accommData._id,
            classification: "Accommodation",
            content: "The place is mid."
        })

        const report = await request(app).post("/reportAccomm").send({
            user: user.body.data.email,
            reported_id: accommData._id,
            classification: "Accommodation",
            content: "The place is dull."
        })
        const resolvedReport = await Report.findOne({ content: "The place is dirty." })
        const result = await request(app).post("/resolveReport").send({
            _id: resolvedReport._id
        })
        const reportCount = await Report.count();
        expect(reportCount).toBe(3);
    })

    test("get pending reports only", async () => {
        const reportResults = await request(app).post("/viewReports").send({
            onlyPending: true,
            onlyResolved: false
        })
        expect(reportResults.body.success).toBe(true);
        expect(reportResults.body.msg).toBe("Viewing Succeeded");
        expect(reportResults.body.result.length).toBe(2);
    })

    test("get resolved reports only", async () => {
        const reportResults = await request(app).post("/viewReports").send({
            onlyPending: false,
            onlyResolved: true
        })
        expect(reportResults.body.success).toBe(true);
        expect(reportResults.body.msg).toBe("Viewing Succeeded");
        expect(reportResults.body.result.length).toBe(1);
    })

    test("get every report", async () => {
        const reportResults = await request(app).post("/viewReports").send({
            onlyPending: true,
            onlyResolved: true
        })
        expect(reportResults.body.success).toBe(true);
        expect(reportResults.body.msg).toBe("Viewing Succeeded");
        expect(reportResults.body.result.length).toBe(3);
    })

    test("false values for onlyPending and onlyResolved should return the correct values", async () => {
        const reportResults = await request(app).post("/viewReports").send({
            onlyPending: false,
            onlyResolved: false
        })
        expect(reportResults.body.success).toBe(false);
        expect(reportResults.body.msg).toBe("onlyPending and onlyResolved in the request body have no 'true' values");
        expect(reportResults.body.result.length).toBe(0);
    })

    test("no input", async () => {
        const reportResults = await request(app).post("/viewReports").send({})
        expect(reportResults.body.success).toBe(false);
        expect(reportResults.body.msg).toBe("onlyPending and onlyResolved in the request body have no 'true' values");
        expect(reportResults.body.result.length).toBe(0);
    })

    test("wrong input", async () => {
        const reportResults = await request(app).post("/viewReports").send({
            onlyPending: "mali",
            onlyResolved: "tama"
        })
        expect(reportResults.body.success).toBe(false);
        expect(reportResults.body.msg).toBe("onlyPending and onlyResolved in the request body have no 'true' values");
        expect(reportResults.body.result.length).toBe(0);
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase().then(() => mongoose.connection.close())
})