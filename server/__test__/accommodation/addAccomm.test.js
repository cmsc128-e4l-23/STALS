import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';

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

describe("POST /addAccomm", () => {
    describe("Happy paths", () => {
        test("should successfully add an accommodation to the database", async() => {
            //adding a new user to the database
            await request(app).post("/signup").send(mockUser);
    
            //adding accommodation to the database
            const res = await request(app).post("/addAccomm").send(mockAccomm);
            expect(res.body.success).toBe(true);
            expect(res.body.msg).toBe("Successfully added accommodation");
        });
    });

    describe("Unhappy paths", () => {
        test("should fail to add accommodation due to same name error", async() => {
            const res = await request(app).post("/addAccomm").send(mockAccomm);
            expect(res.body.success).toEqual(false);
            expect(res.body.msg).toEqual("Unsuccessfully added accommodation");
            expect(res.body.error).toEqual("Accommodation with the same name already exists");
        });

        test("should fail to add an accommodation due to same address error", async() => {
            const res = await request(app).post("/addAccomm").send({...mockAccomm, name: "DIFFERENT DORM"});
            expect(res.body.success).toEqual(false);
            expect(res.body.msg).toEqual("Unsuccessfully added accommodation");
            expect(res.body.error).toEqual("Accommodation with the same address already exists");
        });

        test("should fail to add an accommodation due to 'User not found' error", async() => {
            const res = await request(app).post("/addAccomm").send({...mockAccomm, owner: "random@email.com"});
            expect(res.body.success).toEqual(false);
            expect(res.body.msg).toEqual("Unsuccessfully added accommodation");
            expect(res.body.error).toEqual("User not found");
        });
    });
});

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})