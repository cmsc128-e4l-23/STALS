import request from "supertest";
import makeDB from "../../mongoose";
import mongoose from "mongoose";
import Accommodation from "../../models/Accommodation";

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));

const url = "http://localhost:3001";

// it("Data Initialization", async() => {  
//     trueUser = await User.findOne({email: 'mtate@gmail.com'})
//     trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
//     falseUser = await User.findOne({email: 'fching@gmail.com'})
//     falseAccomm = await User.findOne({name: 'Nawawalang Paraiso'})
// })
//     trueUser = await User.findOne({email: 'mtate@gmail.com'})
//     trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
//     falseUser = await User.findOne({email: 'fching@gmail.com'})
//     falseAccomm = await User.findOne({name: 'Nawawalang Paraiso'})

describe("Bookmark Test", () => {

    it("Configuration Check", async () => {
        const trueUser = await User.findOne({email: 'mtate@gmail.com'})
        const trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
        await request(url).post("/removeBookmarkAccomm").send({user_id: trueUser._id, accomm_id: trueAccomm._id})
    })

    describe("Happy paths", () => {
        test("Should bookmark successfully", async () => {
            const trueUser = await User.findOne({email: 'mtate@gmail.com'})
            const trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
            const res = await request(url).post("/bookmarkAccomm")
                .send({
                    user_id: trueUser._id,
                    accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(true);
        });
    })

    describe("Unhappy paths", () => {
        test("Bookmarking with the same user and accomm should not work", async () => {
            const trueUser = await User.findOne({email: 'mtate@gmail.com'})
            const trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
            const res = await request(url).post("/bookmarkAccomm")
                .send({
                   user_id: trueUser._id,
                   accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });
    
        test("Bookmarking with incorrect user should not work", async () => {
            const falseUser = await User.findOne({email: 'fching@gmail.com'})
            const trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
            const res = await request(url).post("/bookmarkAccomm")
                .send({
                    user_id: falseUser._id,
                    accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });
    
        test("Bookmarking with incorrect accomm should not work", async () => {
            const trueUser = await User.findOne({email: 'mtate@gmail.com'})
            const falseAccomm = await User.findOne({name: 'Nawawalang Paraiso'})
            const res = await request(url).post("/bookmarkAccomm")
                .send({
                    user_id: trueUser._id,
                    accomm_id: falseAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });
    
        test("Bookmarking with incorrect user and accomm should not work", async () => {
            const falseUser = await User.findOne({email: 'fching@gmail.com'})
            const falseAccomm = await User.findOne({name: 'Nawawalang Paraiso'})
            const res = await request(url).post("/bookmarkAccomm")
                .send({
                    user_id: falseUser._id,
                    accomm_id: falseAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });
    })
    
})

describe("Unbookmark Test", () => {

    it("Configuration Check", async () => {
        const trueUser = await User.findOne({email: 'mtate@gmail.com'})
        const trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
        await request(url).post("/bookmarkAccomm").send({user_id: trueUser._id, accomm_id: trueAccomm._id})
    })

    describe("Happy paths", () => {
        test("Should unbookmark successfully", async () => {
            const trueUser = await User.findOne({email: 'mtate@gmail.com'})
            const trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
            const res = await request(url).post("/removeBookmarkAccomm")
                .send({
                    user_id: trueUser._id,
                    accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(true);
        });
    })

    describe("Unhappy paths", () => {
        test("Unbookmarking with the same user and accomm should not work", async () => {
            const trueUser = await User.findOne({email: 'mtate@gmail.com'})
            const trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
            const res = await request(url).post("/removeBookmarkAccomm")
                .send({
                    user_id: trueUser._id,
                    accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });

        test("Unbookmarking with incorrect user should not work", async () => {
            const falseUser = await User.findOne({email: 'fching@gmail.com'})
            const trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
            const res = await request(url).post("/removeBookmarkAccomm")
                .send({
                    user_id: falseUser._id,
                    accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });

        test("Unbookmarking with incorrect accomm should not work", async () => {
            const trueUser = await User.findOne({email: 'mtate@gmail.com'})
            const falseAccomm = await User.findOne({name: 'Nawawalang Paraiso'})
            const res = await request(url).post("/removeBookmarkAccomm")
                .send({
                    user_id: trueUser._id,
                    accomm_id: falseAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });

        test("Unbookmarking with incorrect user and accomm should not work", async () => {
            const falseUser = await User.findOne({email: 'fching@gmail.com'})
            const falseAccomm = await User.findOne({name: 'Nawawalang Paraiso'})
            const res = await request(url).post("/removeBookmarkAccomm")
                .send({
                    user_id: falseUser._id,
                    accomm_id: falseAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });
    })

})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})