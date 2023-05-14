import app from '../../app';
import makeDB from '../../mongoose.js';
import mongoose from 'mongoose';
import request from 'supertest';
import Report from "../../models/Report.js"
import Accommodation from "../../models/Accommodation.js"
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

describe("POST /resolveReport", () =>{
    it("Initializing the mock database for testing", async () => {
            const user = await request(app).post("/signup").send(signup_details)
            await request(app).post("/addAccomm").send(accomm_details)
            const accommData = await Accommodation.findOne({name: "White House"});
            await request(app).post("/reportAccomm").send({
                user_id: user.body.data._id,
                reported_id: accommData._id,
                classification: "Accommodation",
                content: "The place is dirty."
            })
            await request(app).post("/reportAccomm").send({
                user_id: user.body.data._id,
                reported_id: accommData._id,
                classification: "Accommodation",
                content: "The place is mid."
            })
            const reportCount = await Report.count();
            expect(reportCount).toBe(2);
    })
    
    test("Correct input for resolveReport method", async () =>{
        const reportBefore = await Report.findOne({content: "The place is dirty."})
        expect(reportBefore.status).toBe("Pending");
        const result = await request(app).post("/resolveReport").send({_id: reportBefore._id});
        expect(result.body.success).toBe(true);
        expect(result.body.msg).toBe("Resolving succeeded");
        const reportAfter = await Report.findOne({content: "The place is dirty."})
        expect(reportAfter.status).toBe("Resolved");
    })

    test("No input for resolveReport method", async () =>{
        const result = await request(app).post("/resolveReport").send({})
        expect(result.body.success).toBe(false);
        expect(result.body.msg).toBe("Resolved no reports");
    })

    test("Wrong input for resolveReport method", async () =>{
        const result = await request(app).post("/resolveReport").send({_id: "IDeeeeeee"})
        expect(result.body.success).toBe(false);
        expect(result.body.msg).toBe("Resolving failed");
    })
})


afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})