import app from '../app';
import makeDB from '../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import Accommodation from '../models/Accommodation';
import User from '../models/User';
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

//ACCOMMODATIONS TO BE USED FOR THE FUTURE TESTS
let newAccomm;
let editAccomm;

describe("Accommodation Tests", () => {

    //============================ Add Accommodation ============================
    test("should successfully add an accommodation to the database", async() => {
        //adding a new user to the database
        await request(app).post("/signup").send(mockUser);

        //adding accommodation to the database
        const res = await request(app).post("/addAccomm").send(mockAccomm);
        expect(res.body).toEqual({
            "success": true,
            "msg": "Successfully added accommodation"
        });
        
        //Getting added accommodation to be used for future testing
        newAccomm = await Accommodation.findOne({ name: mockAccomm.name });

        //Mock document to be used for edit tests
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
    });

    test("should fail to add accommodation due to same name error", async() => {
        const res = await request(app).post("/addAccomm").send(mockAccomm);
        expect(res.body).toEqual({
            "error": "Accommodation with the same name already exists",
            "msg": "Unsuccessfully added accommodation",
            "success": false
        });
    });

    test("should fail to add an accommodation due to same address error", async() => {
        const res = await request(app).post("/addAccomm").send({...mockAccomm, name: "DIFFERENT DORM"});
        expect(res.body).toEqual({
            "error": "Accommodation with the same address already exists",
            "msg": "Unsuccessfully added accommodation",
            "success": false
        });
    });

    test("should fail to add an accommodation due to 'User not found' error", async() => {
        const res = await request(app).post("/addAccomm").send({...mockAccomm, owner: "random@email.com"});
        expect(res.body).toEqual({"error": "User not found", "msg": "Unsuccessfully added accommodation","success": false});
    });

    //============================ Archive ============================
    test("should successfully archive an accommodation from database", async () => {
        const res = await request(app).post("/archiveAccomm").send({_id: newAccomm._id});
        expect(res.body.success).toBe(true);
    });

    test("should fail in archiving an accommodation from database", async () => {
        const res = await request(app).post("/archiveAccomm").send({ _id: "645a23db01e8d52bb114278b" });
        expect(res.body).toEqual({
            "error": "Failed to find and archive accommodation",
            "msg": "Unsuccessfully archived accommodation",
            "success": false,
        });
    });

    test("should successfully unarchive an accommodation from database", async () => {
        const res = await request(app).post("/unarchiveAccomm").send({_id: newAccomm._id});
        expect(res.body.success).toBe(true);
    });

    test("should fail in unarchiving an accommodation from database", async () => {
        const res = await request(app).post("/unarchiveAccomm").send({ _id: "645a23db01e8d52bb114278b" });
        expect(res.body).toEqual({
            "error": "Failed to find and unarchive accommodation",
            "msg": "Unsuccessfully unarchived accommodation",
            "success": false,
        });
    });

    //============================ Edit Accommodation ============================
    test("should successfully edit accommodation from database", async () => {
        const res = await request(app).post("/editAccomm").send(editAccomm);
        expect(res.body.success).toBe(true);
    });

    test("should fail to edit accommodation due to accommodation not existing", async () => {
        const res = await request(app).post("/editAccomm").send({...editAccomm, _id: "64534e45d46998fe6b1edb69"});
        expect(res.body.success).toBe(false);
        expect(res.body).toEqual({"error": "Accommodation not found.", "msg": "Unsuccessfully edited accommodation", "success": false});
    });

    //============================ Delete Accommodation ============================
    test("should successfully delete accommodation", async () => {
        // const currAccomm = await Accommodation.findOne({ name: "Mock Accommodation" });
        const res = await request(app).post("/deleteAccomm").send({_id: newAccomm._id});
        expect(res.body.success).toBe(true);
    });

    test("should fail to delete accommodation due to non-existent accommodation", async () => {
        const res = await request(app).post("/deleteAccomm").send({ _id: "615ab89dcf32a1a234555555" });
        expect(res.body).toEqual({
            "error": "Failed to find and delete accommodation",
            "msg": "Unsuccessful deleted accommodation",
            "success": false,
        });
    });

    test("should fail to edit owner's property list at accommodation deletion due to incorrect user id", async () => {
        //adding a mock accommodation
        const result = await request(app).post("/addAccomm").send(mockAccomm);
        newAccomm = await Accommodation.findOne({name: mockAccomm.name});
        
        //editing the mock accommodation
        const result1 = await request(app).post("/editAccomm").send({_id: newAccomm._id, owner: "615ab89dcf32a1a2345abcde"});
        newAccomm = await Accommodation.findOne({name: mockAccomm.name})
        
        const res = await request(app).post("/deleteAccomm").send({_id: newAccomm._id});
        expect(res.body).toEqual({
            "error": "Failed to find and edit propertyList of current user",
            "msg": "Unsuccessful deleted accommodation",
            "success": false
        });
    });
    
});

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})