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

let accomm;

let review_details = {
    user: "mtate@gmail.com",
    propertyId: "",
    content: "I like it",
    rating: 1,
    photos: [{ filename: "Photo1" }]
}
describe("POST /addReview", () => {
    test("With complete and correct parameters", async () => {
        await request(app).post("/signup").send(signup_details);
        await request(app).post("/addAccomm").send(accomm_details);
        accomm = await Accommodation.findOne({ name: accomm_details.name });
        review_details.propertyId = accomm._id;

        const res = await request(app).post("/addReview").send(review_details);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
    test("Adding new review with incorrest user credential", async () => {
        var temp = review_details.user;
        review_details.user = "mtatea@gmail.com";
        const res = await request(app).post("/addReview").send(review_details);
        review_details.user = temp;
        console.log(res.body);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("User not found");
    });
});

var review_edit = {
    _id: "",
    content: "I like it vvm",
    rating: 4,
    photos: [{ filename: "Photo1" }]
}

describe("POST /editReview", () => {
    test("Edit an existing review with correct parameters", async () => {
        const review = await Review.findOne({})
        review_edit._id = review._id.toString();
        const res = await request(app).post("/editReview").send(review_edit);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
    test("Edit an existing review with wrong review_id", async () => {
        review_edit._id = "644e58b2f157a1f22a80e741";
        const res = await request(app).post("/editReview").send(review_edit);
        console.log(res.body);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Review not found");
    });
});

var review_delete = {
    _id: "",
    user: "mtaae@gmail.com",
    propertyId: ""
};
// //change id of review for deletion
describe("POST /deleteReview", () => {
    test("Deleting a review with wrong user email", async () => {
        const review = await Review.findOne({})
        review_delete._id = review._id.toString()
        review_delete.propertyId = accomm._id
        const res = await request(app).post("/deleteReview")
            .send(review_delete);
        console.log(res.body);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Accomodation/User not found");
    });
    test("Deleting a review with correct parameters", async () => {
        review_delete.user = signup_details.email;
        const res = await request(app).post("/deleteReview")
            .send(review_delete);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
    test("Deleting an already deleted review", async () => {
        const res = await request(app).post("/deleteReview")
            .send(review_delete);
        console.log(res.body);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Review not found");
    });
});

describe("POST /getReview", () => {
    test("Getting all reviews on an accomm", async () => {
        await request(app).post("/addReview").send(review_details); //adding a review again
        const res = await request(app).post("/getReview")
            .send({ propertyId: accomm._id });
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
    test("Getting all reviews of a user", async () => {

        const res = await request(app).post("/getReview")
            .send({ user: signup_details.email });
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
    test("Getting all reviews of an unknown user", async () => {

        const res = await request(app).post("/getReview")
            .send({ user: "unknown@gmail.com" });
        console.log(res.body);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("User not found");
    });
});

afterAll(() => {
    mongoose.connection.db.dropDatabase()
        .then(() => mongoose.connection.close())
})