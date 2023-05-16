import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import Accommodation from '../../models/Accommodation';

// beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));
beforeAll(() => makeDB('mongodb+srv://STALS-user:password123321@stals-test.bsqn4yg.mongodb.net/'));

const mockUser = {
    userType: "Owner",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "password123",
    phoneNumber: "09123456789",
    birthday: "1990-01-01",
    profilePhoto: "https://example.com/profile-photo.jpg",
    sex: "Male",
    verificationFiles: ["https://example.com/verification-file1.jpg", "https://example.com/verification-file2.jpg"],
    reviews: [],
    reports: [],
    bookmarks: [],
    owner: {
      propertiesList: [],
      archivedList: [],
      status: "active"
    },
    admin: {
      pendingApplications: [],
      pendingReports: []
    }
};

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

let newAccomm;

describe("POST /unarchiveAccomm", () => {
    describe("Happy paths", () => {
        test("should successfully unarchive an accommodation from database due to incorrect accommodation id", async () => {
            //Creating mock user and accommodation for testing
            await request(app).post("/signup").send(mockUser);
            await request(app).post("/addAccomm").send(mockAccomm);
            newAccomm = await Accommodation.findOne({ name: mockAccomm.name });

            const res = await request(app).post("/unarchiveAccomm").send({_id: newAccomm._id});
            expect(res.body.success).toBe(true);
        });
    })

    describe("Unhappy paths", () => {
        test("should fail in unarchiving an accommodation from database", async () => {
            const res = await request(app).post("/unarchiveAccomm").send({ _id: "645a23db01e8d52bb114278b" });
            expect(res.body.success).toEqual(false);
            expect(res.body.msg).toEqual("Unsuccessfully unarchived accommodation");
            expect(res.body.error).toEqual("Failed to find and unarchive accommodation");
        });
    })  
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})