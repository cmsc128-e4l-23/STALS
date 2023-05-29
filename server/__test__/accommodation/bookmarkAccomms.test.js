import app from "../../app";
import request from "supertest";
import makeDB from "../../mongoose";
import mongoose from "mongoose";
import User from "../../models/User";
import Accommodation from "../../models/Accommodation";

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));

const url = "http://localhost:3001";

// add mock data
const trueUser = {
    userType: "Student",
    firstName: "Player 1",
    lastName: "Blank",
    email: "true@up.edu.ph",
    password: "player1blank",
    phoneNumber: "09123456789",
    birthday: "2002-05-07",
    sex: "Male"
}

const falseUser = {
    userType: "Student",
    firstName: "Player 2",
    lastName: "Blank",
    email: "false@up.edu.ph",
    password: "player2blank",
    phoneNumber: "09987654321",
    birthday: "2002-05-08",
    sex: "Male"
}

const landchad = {
    userType: "Owner",
    firstName: "Player Three",
    lastName: "Blank",
    email: "landchad@up.edu.ph",
    password: "player3_blank",
    phoneNumber: "09957331927",
    birthday: "2002-05-09",
    sex: "Male"
}

const trueAccomm = {
    name: "True Accommodation",
    owner: "landchad@up.edu.ph",
    landmarks: ["Landmark 1", "Landmark 2"],
    address: {
        postCode: "12345",
        street: "Mock Street",
        barangay: "Mock Barangay",
        city: "Mock Town",
        province: "Laguna",
        region: "CALABARZON"
    },
    generalLocation: 1,
    accommodationType: "Transient",
    amenities: ["Amenity 1", "Amenity 2"],
    priceRange: {
        minPrice: 1000,
        maxPrice: 2000
    },
    description: "This is a mock accommodation.",
    photos: ["photo1.jpg", "photo2.jpg"],
    restrictions: ["Restriction 1", "Restriction 2"],
    security: "Security details",
    archived: false,
    reviews: [] // Example review IDs
};

const falseAccomm = {
    name: "False Accommodation",
    owner: "landchad@up.edu.ph",
    landmarks: ["Landmark 1", "Landmark 2"],
    address: {
        postCode: "55555",
        street: "Mock Street",
        barangay: "Mock Barangay",
        city: "Mock City",
        province: "Metro Manila",
        region: "NCR"
    },
    generalLocation: 7,
    accommodationType: "Transient",
    amenities: ["Amenity 1", "Amenity 2"],
    priceRange: {
        minPrice: 1000,
        maxPrice: 2000
    },
    description: "This is a mock accommodation.",
    photos: ["photo1.jpg", "photo2.jpg"],
    restrictions: ["Restriction 1", "Restriction 2"],
    security: "Security details",
    archived: false,
    reviews: [] // Example review IDs
};

describe("Bookmark All Test", () => {

    it("Configuration Check", async () => {
        let result;
        result = await request(app).post("/signup").send(landchad)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/signup").send(trueUser)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/signup").send(falseUser)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/addAccomm").send(trueAccomm)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/addAccomm").send(falseAccomm)
        expect(result.body.success).toBe(true)
        // there should be one user and four accomms
        const usercount = await User.count();
        expect(usercount).toBe(3);
        const accommcount = await Accommodation.count();
        expect(accommcount).toBe(2);
    })

    // assuming that there aren't bookmarks yet
    describe("Bookmark Test", () => {

        describe("Happy paths", () => {
            test("Should bookmark successfully", async () => {
                const _trueUser = await User.findOne({ email: trueUser.email })
                const _trueAccomm = await Accommodation.findOne({ name: trueAccomm.name })
                const res = await request(app).post("/bookmarkAccomm")
                    .send({
                        user: trueUser.email,
                        accomm_id: (_trueAccomm._id).toString()
                    },);
                expect(res.body.success).toBe(true);
            });
        })

        describe("Unhappy paths", () => {
            test("Bookmarking with the same user and accomm should not work", async () => {
                const _trueUser = await User.findOne({ email: trueUser.email })
                const _trueAccomm = await Accommodation.findOne({ name: trueAccomm.name })
                const res = await request(app).post("/bookmarkAccomm")
                    .send({
                        user: trueUser.email,
                        accomm_id: (_trueAccomm._id).toString()
                    },);
                expect(res.body.success).toBe(false);
            });
        })

    })

    describe("Unbookmark Test", () => {

        describe("Happy paths", () => {
            test("Should unbookmark successfully", async () => {
                const _trueUser = await User.findOne({ email: trueUser.email })
                const _trueAccomm = await Accommodation.findOne({ name: trueAccomm.name })
                const res = await request(app).post("/removeBookmarkAccomm")
                    .send({
                        user: trueUser.email,
                        accomm_id: (_trueAccomm._id).toString()
                    },);
                expect(res.body.success).toBe(true);
            });
        })

        describe("Unhappy paths", () => {
            test("Unbookmarking with the same user and accomm should not work", async () => {
                const _trueUser = await User.findOne({ email: trueUser.email })
                const _trueAccomm = await Accommodation.findOne({ name: trueAccomm.name })
                const res = await request(app).post("/removeBookmarkAccomm")
                    .send({
                        user: trueUser.email,
                        accomm_id: (_trueAccomm._id).toString()
                    },);
                expect(res.body.success).toBe(false);
            });
        })

    })

})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
        .then(() => mongoose.connection.close())
})