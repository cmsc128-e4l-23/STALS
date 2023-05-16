import app from '../../app';
import Accommodation from '../../models/Accommodation';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import Review from '../../models/Review';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

const user_details = {
    userType: "Student",
    firstName: "Maui",
    lastName: "Tate",
    email: "mtate@gmail.com",
    password: "mtate1234",
    phoneNumber: "09123456789",
    birthday: "2002-08-09",
    sex: "Male"
}

const owner_details = {
    userType: "Owner",
    firstName: "Owner",
    lastName: "Kun",
    email: "okun@gmail.com",
    password: "okun1234",
    phoneNumber: "09287456987",
    birthday: "2002-07-09",
    sex: "Male"
}

const accomm_details = {
    name: "Budget Inn",
    owner: "okun@gmail.com",
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
var review_delete = {
    _id: "",
    user: "mtaae@gmail.com",
    propertyId: ""
};

describe("POST /deleteReview", () => {
    test("Deleting a review with wrong user email", async () => {
        //populating the db for tests
        await request(app).post("/signup").send(user_details);
        await request(app).post("/signup").send(owner_details);
        await request(app).post("/addAccomm").send(accomm_details);

        //setting up the object for testing
        accomm = await Accommodation.findOne({ name: accomm_details.name });
        review_details.propertyId = accomm._id;
        await request(app).post("/addReview").send(review_details);
        const review = await Review.findOne({})
        review_delete._id = review._id;
        review_delete.propertyId = accomm._id

        const res = await request(app).post("/deleteReview")
            .send(review_delete);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Accomodation/User not found");
    });

    test("Deleting a review with correct parameters", async () => {
        //correcting the email
        review_delete.user = user_details.email;
        const res = await request(app).post("/deleteReview")
            .send(review_delete);
        expect(res.body.success).toBe(true);
    });
    test("Deleting an already deleted review", async () => {
        //repeating the delete request
        const res = await request(app).post("/deleteReview")
            .send(review_delete);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Review not found");
    });
});

afterAll(() => {
    mongoose.connection.db.dropDatabase()
        .then(() => mongoose.connection.close())
})