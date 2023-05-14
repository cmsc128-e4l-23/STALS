import app from '../app';
import makeDB from '../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import Accommodation from '../../models/Accommodation';
import User from '../../models/User';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

const mockAccomm = new Accommodation({
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
});
const savedAccommodation = await mockAccomm.save();
//signup from auth test.
var mockUser = new User({
    userType: "Student",
    firstName: "Nestor Harvey",
    lastName: "Garcia",
    email: "ngarcia@up.edu.ph",
    password: "garcia2020_02948",
    phoneNumber: "09957331927",
    birthday: "2002-05-07",
    sex: "Male",
    bookmarks: [savedAccommodation._id]
});
const savedUser = await mockUser.save();

describe("POST /generateRep", () => {
    test("Expected input", async () => {
        const response = await request(app).post("/generateRep").send(mockUser._id)
        console.log(response.body)
        expect(response.body.success).toBe(true)
    })
    savedUser.bookmarks = [];
    test("No bookmarks", async () => {
        const response = await request(app).post("/generateRep").send(mockUser._id)
        console.log(response.body)
        expect(response.body.success).toBe(false)
    })
    test("User not logged in", async () =>{
        const response = await request(app).post("/generateRep").send()
        console.log(response.body)
        expect(response.body.success).toBe(false)
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})