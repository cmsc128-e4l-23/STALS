import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import Accommodation from '../../models/Accommodation';
import User from '../../models/User';

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));

var mockUser = {
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

var mockAccomm = {
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

var newAccomm;

describe("POST /archiveAccomm", () => {

  it("Mock Database Population", async () => {
    let result;
    result = await request(app).post("/signup").send(mockUser)
    expect(result.body.success).toBe(true)
    result = await request(app).post("/addAccomm").send(mockAccomm)
    expect(result.body.success).toBe(true)
    // there should be one user and one accomms
    const usercount = await User.count();
    expect(usercount).toBe(1);
    const accommcount = await Accommodation.count();
    expect(accommcount).toBe(1);
    // get the new accomm
    newAccomm = await Accommodation.findOne({ name: mockAccomm.name });
    // set it to unarchived
    result = await Accommodation.findByIdAndUpdate(
      newAccomm._id,
      { $set: { archived: false }}
    ); expect(result).not.toBeNull();
})

  describe("Happy paths", () => {
      test("should successfully archive an accommodation from database", async () => {
          const res = await request(app).post("/archiveAccomm").send({_id: newAccomm._id});
          expect(res.body.success).toBe(true);
      });
  })

  describe("Unhappy paths", () => {
      test("should fail : accommodation already archived", async () => {
          const res = await request(app).post("/archiveAccomm").send({ _id: newAccomm._id });
          expect(res.body.success).toEqual(false);
          expect(res.body.msg).toEqual("Unsuccessfully archived accommodation");
          expect(res.body.error).toEqual("Accommodation already archived");
      });
  })  
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})