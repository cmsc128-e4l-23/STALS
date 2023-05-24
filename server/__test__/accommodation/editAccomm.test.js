import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
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

let newAccomm, editAccomm;

//Testing
describe("POST /editAccomm", () => {

    it("Mock Database Population", async () => {
        let result;
        result = await request(app).post("/signup").send(mockUser);
        expect(result.body.success).toBe(true)
        result = await request(app).post("/addAccomm").send(mockAccomm);
        expect(result.body.success).toBe(true)
        newAccomm = await Accommodation.findOne({ name: mockAccomm.name });
        expect(newAccomm).not.toBeNull();

        //Mock Accommodation for edit
        editAccomm = {
            _id: newAccomm._id,
            name: 'Never',
            landmarks: [ 'Gonna' ],
            address: {
                postCode: 'Give',
                street: 'You',
                barangay: 'Up',
                city: 'Never',
                province: 'Gonna',
                region: 'Let'
            },
            generalLocation: 310771,
            accommodationType: 'You',
            amenities: [ 'Down' ],
            priceRange: {
                minPrice: 10000,
                maxPrice: 15000
            },
            description: 'Never gonna run around and desert you',
            photos: [ 'and' ],
            restrictions: ["desert", "you"],
            security: 'Rick Astley',
            archived: false
        }
    })
    test("should successfully edit accommodation from database", async () => {
        const res = await request(app).post("/editAccomm").send(editAccomm);
        expect(res.body.success).toBe(true);
    });

    /*
    determining whether the accommodation would exist by id 
    should be unnecessary, users shouldn't search by id directly
    */
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})