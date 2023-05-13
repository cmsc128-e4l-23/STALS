import app from '../../app';
import makeDB from '../../mongoose.js';
import mongoose from 'mongoose';
import request from 'supertest';
import Report from "../../models/Report.js"
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

const signup_details = {
    userType: "Student",
    firstName: "Nestor Harvey",
    lastName: "Garcia",
    email: "ngarcia@up.edu.ph",
    password: "garcia2020_02948",
    phoneNumber: "09957331927",
    birthday: "2002-05-07",
    sex: "Male"
}
var accomm_details = {
    name: "White House",
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
    test("Testing a correct input for resolveReport method", async () =>{
        const user = await request(app).post("/signup").send(signup_details)
        accomm_details.owner = user.body.data.email;
        const accomm = await request(app).post("/addAccomm").send(accomm_details)
        const report = await request(app).post("/reportAccomm").send({
            user_id: user.body.data._id,
            reported_id: accomm.body.data._id,
            classification: "Accommodation",
            content: "The place is dirty."
        }) 
        
        expect(report.body.data.status).toBe("Pending");
        const result = await request(app).post("/resolveReport").send({
            _id: report.body.data._id
        })
        expect(result.body.success).toBe(true);
        expect(result.body.msg).toBe("Resolving succeeded");
        
        const postReport = await Report.findById(report.body.data._id);
        expect(postReport.status).toBe("Resolved");
    })

    test("Testing no input for resolveReport method", async () =>{
        const result = await request(app).post("/resolveReport").send({})
        console.log(result.body);
        expect(result.body.success).toBe(false);
        expect(result.body.msg).toBe("Resolved no reports");
    })
})


afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})