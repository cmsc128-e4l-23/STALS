import app from '../../app';
import makeDB from '../../mongoose.js';
import mongoose from 'mongoose';
import request from 'supertest';
import Report from "../../models/Report.js"
import Accommodation from "../../models/Accommodation.js"
import Visit from "../../models/Visit.js";

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

const signup_details1 = {
    userType: "Teacher",
    firstName: "Player 1",
    lastName: "Blank",
    email: "p1blank@up.edu.ph",
    password: "player1blank",
    phoneNumber: "09123456789",
    birthday: "2002-05-07",
    sex: "Male"
}

const signup_details2 = {
    userType: "Teacher",
    firstName: "Player 2",
    lastName: "Sora",
    email: "p2sora@up.edu.ph",
    password: "player2sora",
    phoneNumber: "09876543210",
    birthday: "2002-05-07",
    sex: "Male"
}

const signup_details3 = {
    userType: "Student",
    firstName: "Player 3",
    lastName: "Shiro",
    email: "p3shiro@up.edu.ph",
    password: "player3shiro",
    phoneNumber: "09753126480",
    birthday: "2002-05-07",
    sex: "Female"
}

var accomm_details1 = {
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

var accomm_details2 = {
    name: "The House",
    owner: "p3shiro@up.edu.ph",
    landmarks: ["Raymundo Gate"],
    address: {
      postCode: "2234",
      street: "Street 11",
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

describe("POST /approveAccomm", () =>{
    it("Initializing the mock database for testing", async () => {
        await request(app).post("/signup").send(signup_details1)
        await request(app).post("/signup").send(signup_details2)
        await request(app).post("/signup").send(signup_details3)
        await request(app).post("/addAccomm").send(accomm_details1)
        await request(app).post("/addAccomm").send(accomm_details2)
    })

    test("Testing correct input", async () => {
        const accomm_before = (await Accommodation.findOne({name: "White House"}));
        expect(accomm_before.approved).toBe(false);

        const result = (await request(app).post("/approveAccomm").send({
            accomm_id: accomm_before._id.toString()
        })).body
        
        expect(result.success).toBe(true);
        expect(result.msg).toBe("Successfully approve accommodation");

        const accomm_after = (await Accommodation.findOne({name: "White House"}));
        expect(accomm_after.approved).toBe(true);
    })

    test("Testing incorrect input", async () => {
        const accomm_before = (await Accommodation.findOne({name: "The House"}));
        expect(accomm_before.approved).toBe(false);

        const result = (await request(app).post("/approveAccomm").send({})).body
        
        expect(result.success).toBe(false);
        expect(result.msg).toBe("Unsuccessfully approve accommodation");
        expect(result.error).toBe("No accomm_id input provided");

        const accomm_after = (await Accommodation.findOne({name: "The House"}));
        expect(accomm_after.approved).toBe(false);
    })
})


afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})