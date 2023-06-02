import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import Accommodation from '../../models/Accommodation';
import User from '../../models/User';
import Review from '../../models/Review';
import Report from '../../models/Report';

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

const signup_details1 = {
    userType: "Teacher",
    firstName: "Player 1",
    lastName: "Blank",
    email: "p1blank@up.edu.ph",
    password: "player1blank",
    phoneNumber: "09123456789",
    birthday: "2002-05-07",
    sex: "Male"
}

const signup_details2 = {
    userType: "Teacher",
    firstName: "Player 2",
    lastName: "Sora",
    email: "p2sora@up.edu.ph",
    password: "player2sora",
    phoneNumber: "09876543210",
    birthday: "2002-05-07",
    sex: "Male"
}

const signup_details3 = {
    userType: "Student",
    firstName: "Player 3",
    lastName: "Shiro",
    email: "p3shiro@up.edu.ph",
    password: "player3shiro",
    phoneNumber: "09753126480",
    birthday: "2002-05-07",
    sex: "Female"
}

var accomm_details1 = {
    name: "White House",
    owner: "p1blank@up.edu.ph",
    landmarks: ["Raymundo Gate"],
    address: {
      postCode: "1234",
      street: "Street 10",
      barangay: "Barangay 11",
      city: "City 12",
      province: "Laguna",
      region: "CALABARZON"
    },
    generalLocation: 1,
    accommodationType: "Transient",
    amenities: "Free Wi-Fi",
    priceRange: {
      minPrice: 5000,
      maxPrice: 10000
    },
    description: "A place to stay at!",
    photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
    restrictions: ["no visitors allowed"]
};

var accomm_details2 = {
    name: "The House",
    owner: "p3shiro@up.edu.ph",
    landmarks: ["Raymundo Gate"],
    address: {
      postCode: "2234",
      street: "Street 11",
      barangay: "Barangay 11",
      city: "City 12",
      province: "Laguna",
      region: "CALABARZON"
    },
    generalLocation: 1,
    accommodationType: "Transient",
    amenities: "Free Wi-Fi",
    priceRange: {
      minPrice: 5000,
      maxPrice: 10000
    },
    description: "A place to stay at!",
    photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
    restrictions: ["no visitors allowed"]
};

let newAccomm;

describe("POST /deleteAccomm", () => {
    // describe("Happy paths", () => {
    //     test("should successfully delete accommodation", async () => {
    //         //Initializing mock data
    //         await request(app).post("/signup").send(mockUser);
    //         await request(app).post("/addAccomm").send(mockAccomm);
    //         newAccomm = await Accommodation.findOne({ name: mockAccomm.name });

    //         const res = await request(app).post("/deleteAccomm").send({_id: newAccomm._id});
    //         expect(res.body.success).toBe(true);
    //     });
    // })

    // describe("Unhappy paths", () => {
    //     test("should fail to delete accommodation due to non-existent accommodation", async () => {
    //         const res = await request(app).post("/deleteAccomm").send({ _id: "615ab89dcf32a1a234555555" });
    //         expect(res.body.success).toBe(false);
    //         expect(res.body.msg).toBe("Unsuccessfully deleted accommodation");
    //         expect(res.body.error).toBe("Failed to find and delete accommodation");
    //     });

    //     test("should fail to edit owner's property list at accommodation deletion due to incorrect user id", async () => {
    //         //adding a mock accommodation
    //         const result = await request(app).post("/addAccomm").send(mockAccomm);
    //         newAccomm = await Accommodation.findOne({name: mockAccomm.name});
            
    //         //editing the mock accommodation
    //         const result1 = await request(app).post("/editAccomm").send({_id: newAccomm._id, owner: "615ab89dcf32a1a2345abcde"});
    //         newAccomm = await Accommodation.findOne({name: mockAccomm.name})
            
    //         const res = await request(app).post("/deleteAccomm").send({_id: newAccomm._id});
    //         expect(res.body.success).toBe(false);
    //         expect(res.body.msg).toBe("Unsuccessfully deleted accommodation");
    //         expect(res.body.error).toBe("Failed to find and edit propertyList of current user");
    //     });
    // })

    it("populate data for deleteAccomm Function", async ()=> {
        await request(app).post("/signup").send(signup_details1)
        await request(app).post("/signup").send(signup_details2)
        await request(app).post("/signup").send(signup_details3)
        await request(app).post("/addAccomm").send(accomm_details1)
        await request(app).post("/addAccomm").send(accomm_details2)

        const user = await User.findOne({email: "p1blank@up.edu.ph"})
        const accomm = await Accommodation.findOne({name: "The House"})

        await request(app).post("/addReview").send({
            user: user.email,
            propertyId: accomm._id.toString(),
            content: "Content 1",
            rating: 5,
            photos: {filename: "review_details.photos"}
        })

        await request(app).post("/addReview").send({
            user: user.email,
            propertyId: accomm._id,
            content: "Content 2",
            rating: 5,
            photos: {filename: "review_details.photos"}
        })
        
        const review = await Review.find({propertyId: accomm._id});
        // console.log(review);

        const response1 = await request(app).post("/reportAccomm").send({
            user: user.email,
            reported_id: accomm._id,
            classification: "Accommodation",
            content: "Bruh",
        })

        const response2 = await request(app).post("/reportAccomm").send({
            user: user.email,
            reported_id: accomm._id,
            classification: "Accommodation",
            content: "Bruh2",
        })

        const reports = await Report.find({reported: accomm._id});
    })

    test("test deleteAccomm", async () => {
        const accomm_before = await Accommodation.findOne({name: "The House"})
        const user_before = await User.findOne({email: "p1blank@up.edu.ph"})      
        const owner_before = await User.findOne({_id: accomm_before.owner})      
        const reviews_before = await Review.find({propertyId: accomm_before._id});
        const reports_before = await Report.find({reported: accomm_before._id});
        
        expect(user_before.reviews.length).toBe(2)
        expect(user_before.reports.length).toBe(2)
        expect(owner_before.owner.propertiesList.length).toBe(1)
        expect(accomm_before.name).toBe("The House");
        expect(reviews_before.length).toBe(2);
        expect(reports_before.length).toBe(2);
        
        const response2 = await request(app).post("/deleteAccomm").send({
            _id: accomm_before._id
        })

        const user_after = await User.findOne({email: "p1blank@up.edu.ph"})
        const owner_after = await User.findOne({_id: accomm_before.owner})      
        const accomm_after = await Accommodation.findOne({name: "The House"})      
        const reviews_after = await Review.find({propertyId: accomm_before._id});
        const reports_after = await Report.find({reported: accomm_before._id});
        
        expect(user_after.reviews.length).toBe(0)
        expect(user_after.reports.length).toBe(0)
        expect(reviews_after.length).toBe(0);
        expect(reports_after.length).toBe(0);
        expect(accomm_after).toBe(null);
        expect(owner_after.owner.propertiesList.length).toBe(0);
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})