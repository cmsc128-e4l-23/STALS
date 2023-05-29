import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import Accommodation from '../../models/Accommodation';
import User from '../../models/User';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))
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
const mockAccomm2 = {
    name: "Mock Accommodation 2 Electric Boogaloo",
    owner: "johndoe@example.com",
    landmarks: ["Landmark 1", "Landmark 2"],
    address: {
        postCode: "123452",
        street: "Mock Street 2",
        barangay: "Mock Barangay 2",
        city: "Mock City 2",
        province: "Laguna 2",
        region: "CALABARZON 2"
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
// const savedAccommodation = await mockAccomm.save();
//signup from auth test.
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
// const accommodations = mongoose.connection.db.collection('accommodations');
// const users = mongoose.connection.db.collection('users');
// accommodations.insertOne(mockAccomm);
// users.insertOne(mockUser);
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
let savedAccomm;
let savedAccomm2;
describe("POST /generateRep", () => {

    test("Expected input", async () => {
        const saveUserSuccess = await request(app).post("/signup").send(signup_details)
        savedUser = saveUserSuccess.body.data;
        await request(app).post("/signup").send(mockUser)
        await request(app).post("/addAccomm").send(mockAccomm)

        savedAccomm = await Accommodation.findOne({ name: mockAccomm.name });
        const bookmarkBody = { user: savedUser.email, accomm_id: savedAccomm._id };
        await request(app).post("/bookmarkAccomm").send(bookmarkBody);

        //actual testing, user has something in its bookmarks array, which the report prints.
        const response = await request(app).post("/generateRep").send({ user: savedUser.email })
        console.log(response.body)
        expect(response.body.success).toBe(true)
    })
    test("More than one in bookmarks", async () => {
        await request(app).post("/addAccomm").send(mockAccomm2)
        savedAccomm2 = await Accommodation.findOne({ name: mockAccomm2.name });
        const bookmarkBody = { user: savedUser.email, accomm_id: savedAccomm2._id };
        await request(app).post("/bookmarkAccomm").send(bookmarkBody);

        //actual testing, user has something in its bookmarks array, which the report prints.
        const response = await request(app).post("/generateRep").send({ user: savedUser.email })
        console.log(response.body)
        expect(response.body.success).toBe(true)
    })
    test("No bookmarks", async () => {
        //if there are no bookmarks
        const bookmarkBody = { user: savedUser.email, accomm_id: savedAccomm._id };
        const bookmarkBody2 = { user: savedUser.email, accomm_id: savedAccomm2._id };
        await request(app).post("/removeBookmarkAccomm").send(bookmarkBody);
        await request(app).post("/removeBookmarkAccomm").send(bookmarkBody2);
        const response = await request(app).post("/generateRep").send({ user: savedUser.email })
        console.log(response.body)
        expect(response.body.success).toBe(false)
    })
    test("User not logged in", async () => {
        const response = await request(app).post("/generateRep").send({ user: "" })
        console.log(response.body)
        expect(response.body.success).toBe(false)
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
        .then(() => mongoose.connection.close())
})