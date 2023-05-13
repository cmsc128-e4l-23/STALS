import app from '../app';
import Accommodation from '../models/Accommodation';
import Review from '../models/Review';
import makeDB from '../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

const signup_details = {
    userType: "Student",
    firstName: "Maui",
    lastName: "Tate",
    email: "mtate@gmail.com",
    password: "mtate1234",
    phoneNumber: "09123456789",
    birthday: "2002-08-09",
    sex: "Male"
}

const accomm_details = {
    name: "Budget Inn",
    owner: "mtate@gmail.com",
    landmarks: ["Near the bus station"],
    address: {
        postCode: "6000",
        street: "789 Main Street",
        barangay: "Barangay 3",
        city: "Cebu City",
        province: "Cebu",
        region: "Central Visayas"
    },
    generalLocation: 3,
    accommodationType: "Transient",
    amenities: ["Air-conditioning", "Hot shower"],
    priceRange: {
        minPrice: 800,
        maxPrice: 1000
    },
    description: "Stay in our budget inn for a comfortable and affordable stay",
    photos: ["inn.jpg"],
    restrictions: ["No loud music after 10pm"],
    security: "Safe and secure"
};


describe("POST /addReview", () => {
    test("With complete and correct parameters", async () => {
        await request(app).post("/signup").send(signup_details);
        await request(app).post("/addAccomm").send(accomm_details);
        const accomm = await Accommodation.findOne({ name: accomm_details.name })
        var review_details = {
            user: "mtate@gmail.com",
            propertyId: accomm._id,
            content: "I like it",
            rating: 1,
            photos: [{ filename: "Photo1" }]
        }

        const res = await request(app).post("/addReview").send(review_details);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});


describe("add new review with incorrect user cred", () => {
    test("should not add a new review", async () => {
        const res = await request(app).post("/addReview")
            .send({
                user: "mtatea@gmail.com",
                propertyId: "644e58b2f157a1f22a80e741",
                content: "I like it",
                rating: 1,
                photos: [{ filename: "Photo1" }]
            },);
        console.log(res.body);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("User not found!");
    });
});

//change id of review for edit

describe("edit existing review", () => {
    test("should edit review", async () => {
        const review = await Review.findOne({})
        const reviewId = review._id.toString()
        const res = await request(app).post("/editReview")
            .send({
                _id: reviewId,
                content: "I like it vvm",
                rating: 4,
                photos: [{ filename: "Photo1" }]
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});
let reviewId;
// //change id of review for deletion
describe("delete review with wrong user cred", () => {
    test("deleting a review with wrong user email", async () => {
        const review = await Review.findOne({})
        const reviewId = review._id.toString()
        const res = await request(app).post("/deleteReview")
            .send({
                _id: reviewId,
                user: "mtaae@gmail.com",
                propertyId: "644e58b2f157a1f22a80e741"
            },);
        console.log(res.body);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Accomodation/User not found");
    });
    test("should delete review", async () => {
        const review = await Review.findOne({})
        reviewId = review._id.toString()
        const accomm = await Accommodation.findOne({ name: accomm_details.name })
        const res = await request(app).post("/deleteReview")
            .send({
                _id: reviewId,
                user: "mtate@gmail.com",
                propertyId: accomm._id
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});


describe("delete review again", () => {
    test("deleting a deleted review", async () => {

        const accomm = await Accommodation.findOne({ name: accomm_details.name })
        const res = await request(app).post("/deleteReview")
            .send({
                _id: reviewId,
                user: "mtate@gmail.com",
                propertyId: accomm._id
            },);
        console.log(res.body);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Review not found");
    });
});

// //change id of review for fetch
const accommId = "644e58b2f157a1f22a80e741"
describe("fetch all reviews of accomm", () => {
    test("should retrieve all reviews from an accomm", async () => {

        const res = await request(app).post("/getReview")
            .send({
                propertyId: accommId
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});

describe("fetch all reviews of a user", () => {
    test("should retrieve all reviews of an accomm", async () => {

        const res = await request(app).post("/getReview")
            .send({
                user: "mtate@gmail.com"
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});

afterAll(() => {
    mongoose.connection.db.dropDatabase()
        .then(() => mongoose.connection.close())
})