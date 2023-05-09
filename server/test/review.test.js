
const mongoose = require("mongoose");
const request = require("supertest");

describe("add new review", () => {
    test("should add a new review", async () => {
        const res = await request("http://localhost:3001").post("/addReview")
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
        const res = await request("http://localhost:3001").post("/addReview")
            .send({
                user: "mtatea@gmail.com",
                propertyId: "644e58b2f157a1f22a80e741",
                content: "I like it",
                rating: 1,
                photos: [{ filename: "Photo1" }]
            },);
        console.log(res.body);
        expect(res.body.success).toBe(false);
    });
});

//change id of review for edit
const editId = "64560834900798adf49dc33d";
describe("edit existing review", () => {
    test("should edit review", async () => {

        const res = await request("http://localhost:3001").post("/editReview")
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
const deleteId = "6459d4c0ac54f7c40f223c90";
describe("delete review with wrong user cred", () => {
    test("deleting a review with wrong user email", async () => {

        const res = await request("http://localhost:3001").post("/deleteReview")
            .send({
                _id: deleteId,
                user: "mtaae@gmail.com",
                propertyId: "644e58b2f157a1f22a80e741"
            },);
        console.log(res.body);
        expect(res.body.success).toBe(false);
    });
});
describe("delete existing review", () => {
    test("should delete review", async () => {

        const res = await request("http://localhost:3001").post("/deleteReview")
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

        const res = await request("http://localhost:3001").post("/deleteReview")
            .send({
                _id: deleteId,
                user: "mtate@gmail.com",
                propertyId: "644e58b2f157a1f22a80e741"
            },);
        console.log(res.body);
        expect(res.body.success).toBe(false);
    });
});



// //change id of review for fetch
const accommId = "644e58b2f157a1f22a80e741"
describe("fetch all reviews of accomm", () => {
    test("should retrieve all reviews from an accomm", async () => {

        const res = await request("http://localhost:3001").post("/getReview")
            .send({
                propertyId: accommId
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});

describe("fetch all reviews of a user", () => {
    test("should retrieve all reviews of an accomm", async () => {

        const res = await request("http://localhost:3001").post("/getReview")
            .send({
                user: "mtate@gmail.com"
            },);
        console.log(res.body);
        expect(res.body.success).toBe(true);
    });
});