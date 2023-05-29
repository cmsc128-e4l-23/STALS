import app from '../../app';
import Accommodation from '../../models/Accommodation';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';

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
describe("POST /addReview", () => {
    test("With complete and correct parameters", async () => {
        //populating the db for tests
        await request(app).post("/signup").send(user_details);
        await request(app).post("/signup").send(owner_details);
        await request(app).post("/addAccomm").send(accomm_details);
        accomm = await Accommodation.findOne({ name: accomm_details.name });
        review_details.propertyId = accomm._id;

        //adding the review
        const res = await request(app).post("/addReview").send(review_details);
        expect(res.body.success).toBe(true);
    });
    test("Adding new review with incorrest user credential", async () => {
        let temp = review_details.user;
        //changing the email to an incorrect one
        review_details.user = "mtatea@gmail.com";
        const res = await request(app).post("/addReview").send(review_details);
        review_details.user = temp;
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("User not found");
    });
    test("Adding new review by owner on their accomm", async () => {
        let temp = review_details.user;
        //changing the email to the email of the owner of the accomm
        review_details.user = "okun@gmail.com";
        const res = await request(app).post("/addReview").send(review_details);
        review_details.user = temp;
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Owner cannot review own accommodation");
    });
});

afterAll(() => {
    mongoose.connection.db.dropDatabase()
        .then(() => mongoose.connection.close())
})