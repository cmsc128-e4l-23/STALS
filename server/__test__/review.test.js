import request from "supertest";

const url = "http://localhost:3001";
describe("add new review", () => {
    test("should add a new review", async () => {
        const res = await request(url).post("/addReview")
            .send({
                user: "mtate@gmail.com",
                propertyId: "644e58b2f157a1f22a80e741",
                content: "I like it",
                rating: 1,
                photos: [{ filename: "Photo1" }]
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});


describe("add new review with incorrect user cred", () => {
    test("should not add a new review", async () => {
        const res = await request(url).post("/addReview")
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
const editId = "64560834900798adf49dc33d";
describe("edit existing review", () => {
    test("should edit review", async () => {

        const res = await request(url).post("/editReview")
            .send({
                _id: editId,
                content: "I like it vvm",
                rating: 4,
                photos: [{ filename: "Photo1" }]
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});

// //change id of review for deletion
const deleteId = "645a34d59bf7595623e56e22";
describe("delete review with wrong user cred", () => {
    test("deleting a review with wrong user email", async () => {

        const res = await request(url).post("/deleteReview")
            .send({
                _id: deleteId,
                user: "mtaae@gmail.com",
                propertyId: "644e58b2f157a1f22a80e741"
            },);
        console.log(res.body);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Accomodation/User not found");
    });
});
describe("delete existing review", () => {
    test("should delete review", async () => {

        const res = await request(url).post("/deleteReview")
            .send({
                _id: deleteId,
                user: "mtate@gmail.com",
                propertyId: "644e58b2f157a1f22a80e741"
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});

describe("delete review again", () => {
    test("deleting a deleted review", async () => {

        const res = await request(url).post("/deleteReview")
            .send({
                _id: deleteId,
                user: "mtate@gmail.com",
                propertyId: "644e58b2f157a1f22a80e741"
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

        const res = await request(url).post("/getReview")
            .send({
                propertyId: accommId
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});

describe("fetch all reviews of a user", () => {
    test("should retrieve all reviews of an accomm", async () => {

        const res = await request(url).post("/getReview")
            .send({
                user: "mtate@gmail.com"
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});