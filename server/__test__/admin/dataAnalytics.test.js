import app from '../../app';
import makeDB from '../../mongoose.js';
import mongoose from 'mongoose';
import request from 'supertest';
import Report from "../../models/Report.js"
import Accommodation from "../../models/Accommodation.js"
import User from '../../models/User';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

const signup_details1 = {
    userType: "Owner",
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
    userType: "Owner",
    firstName: "Player 3",
    lastName: "Shiro",
    email: "p3shiro@up.edu.ph",
    password: "player3shiro",
    phoneNumber: "09753126480",
    birthday: "2002-05-07",
    sex: "Female"
}

const signup_details4 = {
    userType: "Student",
    firstName: "Player 4",
    lastName: "Kong",
    email: "p4sora@up.edu.ph",
    password: "player4sora",
    phoneNumber: "09876543211",
    birthday: "2002-05-09",
    sex: "Male"
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

describe("dataAnalytics", () =>{
    it("Initializing the mock database for testing", async () => {
        await request(app).post("/signup").send(signup_details1)
        await request(app).post("/signup").send(signup_details2)
        await request(app).post("/signup").send(signup_details3)
        await request(app).post("/signup").send(signup_details4)
        await request(app).post("/addAccomm").send(accomm_details1)
        await request(app).post("/addAccomm").send(accomm_details2)
    })

    describe("GET /dataAnalytics", () => {
        test("Correct number of Registered users", async () => {
            const data = await request(app).get("/dataAnalytics")
            expect(data.body.return.numRegUsers).toBe(4);
        })

        test("Correct number of Accommodation owners", async () => {
            const data = await request(app).get("/dataAnalytics")
            expect(data.body.return.numAccommOwners).toBe(2);
        })

        test("Correct number of Students", async () => {
            const data = await request(app).get("/dataAnalytics")
            expect(data.body.return.numStudents).toBe(1);
        })

        test("Correct number of approved accommodations", async () => {
            const data = await request(app).get("/dataAnalytics")
            expect(data.body.return.numApprovedAccomm).toBe(2);
        })
    })
    
    describe("GET /getPendApp", ()=>{
        test("Correct number of pending applications", async () => {
            const accommID1 = (await Accommodation.findOne({name: "White House"}))._id.toString();
            await request(app).post("/archiveAccomm").send({_id: accommID1});
            const data1 = await request(app).get("/getPendApp")
            expect(data1.body.numPendApps).toBe(1);
            for(let i=0; i<data1.body.numPendApps; i++){
                expect(data1.body.pendApps[i].archived).toBe(true);
            }

            const accommID2 = (await Accommodation.findOne({name: "The House"}))._id.toString();
            await request(app).post("/archiveAccomm").send({_id: accommID2});
            const data2 = await request(app).get("/getPendApp")
            expect(data2.body.numPendApps).toBe(2);
            for(let i=0; i<data2.body.numPendApps; i++){
                expect(data2.body.pendApps[i].archived).toBe(true);
            }
        })
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})