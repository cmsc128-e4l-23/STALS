import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import Accommodation from '../../models/Accommodation';
import User from '../../models/User';
import Report from '../../models/Report';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))
const fakeReport = {
    user: new mongoose.Types.ObjectId(),
    reported: new mongoose.Types.ObjectId(),
    classification: "Accommodation",
    content: "It sucks here. Slow network. Water's got rust in it. I hear whispers from the walls.",
    status: "Pending"
}
const mockAccomm = {
    name: "Mock Accommodation",
    owner: "johndoe@example.com",
    landmarks: ["Landmark 1", "Landmark 2"],
    address: {
        postCode: "12345",
        street: "Mock Street",
        barangay: "Mock Barangay",
        city: "Mock City",
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
    reviews: ["615ab89dcf32a1a234567891", "615ab89dcf32a1a234567892"] // Example review IDs
};
let savedAccomm;
var signup_details = {
    userType: "Student",
    firstName: "Nestor Harvey",
    lastName: "Garcia",
    email: "ngarcia@up.edu.ph",
    password: "garcia2020_02948",
    phoneNumber: "09957331927",
    birthday: "2002-05-07",
    sex: "Male"
}
let savedUser;
const mockUser = {
    userType: "Owner",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "password123",
    phoneNumber: "09123456789",
    birthday: "1990-01-01",
    sex: "Male",
};
describe("POST /reportAccomm", () => {
    test("All fields valid.", async () => {
        //actual testing, user has something in its bookmarks array, which the report prints.
        const saveUserSuccess = await request(app).post("/signup").send(signup_details);
        savedUser = saveUserSuccess.body.data;

        await request(app).post("/signup").send(mockUser)
        const saveAccommSuccess = await request(app).post("/addAccomm").send(mockAccomm)
        savedAccomm = await Accommodation.findOne({ name: mockAccomm.name });
        const mockReport = {
            user: savedUser.email,
            reported_id: savedAccomm._id,
            classification: "Accommodation",
            content: "It sucks here. Slow network. Water's got rust in it. I hear whispers from the walls.",
            status: "Pending"
        }
        const response = await request(app).post("/reportAccomm").send(mockReport);
        console.log(response.body)
        expect(response.body.success).toBe(true)
    })
    test("Accommodation does not exist", async () => {
        //actual testing, user has something in its bookmarks array, which the report prints.
        const mockReport = {
            user: savedUser.email,
            reported_id: new mongoose.Types.ObjectId(),
            classification: "Accommodation",
            content: "It sucks here. Slow network. Water's got rust in it. I hear whispers from the walls.",
            status: "Pending"
        }
        const response = await request(app).post("/reportAccomm").send(mockReport);
        console.log(response.body)
        expect(response.body.success).toBe(false)
    })
    test("Accommodation is archived", async () => {
        //actual testing, user has something in its bookmarks array, which the report prints.
        await request(app).post("/archiveAccomm").send({ _id: savedAccomm._id });
        const mockReport = {
            user: savedUser.email,
            reported_id: savedAccomm._id,
            classification: "Accommodation",
            content: "It sucks here. Slow network. Water's got rust in it. I hear whispers from the walls.",
            status: "Pending"
        }
        const response = await request(app).post("/reportAccomm").send(mockReport);
        console.log(response.body)
        expect(response.body.success).toBe(false)
    })

    test("Nonexistent User", async () => {
        //actual testing, user has something in its bookmarks array, which the report prints.

        const response = await request(app).post("/reportAccomm").send(fakeReport);
        console.log(response.body)
        expect(response.body.success).toBe(false)
    })
})



afterAll(() => {
    mongoose.connection.db.dropDatabase()
        .then(() => mongoose.connection.close())
})