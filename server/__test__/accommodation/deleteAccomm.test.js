import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import User from '../../models/User';
import Accommodation from '../../models/Accommodation';

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));

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

describe("POST /deleteAccomm", () => {

    it("Mock Database Population", async () => {
        let result;
        result = await request(app).post("/signup").send(mockUser)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/addAccomm").send(mockAccomm)
        expect(result.body.success).toBe(true)
        // there should be one user and one accomm
        const usercount = await User.count();
        expect(usercount).toBe(1);
        const accommcount = await Accommodation.count();
        expect(accommcount).toBe(1);
        newAccomm = await Accommodation.findOne({ name: mockAccomm.name });
    })

    describe("Happy paths", () => {
        test("should successfully delete accommodation", async () => {
            const res = await request(app).post("/deleteAccomm").send({_id: newAccomm._id});
            expect(res.body.success).toBe(true);
        });
    })

    describe("Unhappy paths", () => {
      test("should fail to delete accommodation due to non-existent accommodation", async () => {
          const res = await request(app).post("/deleteAccomm").send({ _id: "615ab89dcf32a1a234555555" });
          expect(res.body.success).toBe(false);
          expect(res.body.msg).toBe("Unsuccessfully deleted accommodation");
          expect(res.body.error).toBe("Failed to find and delete accommodation");
      });

      test("should fail to edit owner's property list at accommodation deletion due to incorrect user id", async () => {
          //adding a mock accommodation
          const result = await request(app).post("/addAccomm").send(mockAccomm);
          newAccomm = await Accommodation.findOne({name: mockAccomm.name});
          
          //editing the mock accommodation
          const result1 = await request(app).post("/editAccomm").send({_id: newAccomm._id, owner: "615ab89dcf32a1a2345abcde"});
          newAccomm = await Accommodation.findOne({name: mockAccomm.name})
          
          const res = await request(app).post("/deleteAccomm").send({_id: newAccomm._id});
          expect(res.body.success).toBe(false);
          expect(res.body.msg).toBe("Unsuccessfully deleted accommodation");
          expect(res.body.error).toBe("Failed to find and edit propertyList of current user");
      });
  })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})