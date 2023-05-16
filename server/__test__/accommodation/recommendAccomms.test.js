import request from "supertest";
import makeDB from "../../mongoose";
import mongoose from "mongoose";

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));

const url = "http://localhost:3001";

// simplified data
const laguna_names = [
    'White House',
    'Big Bellys',
    'F Park',
    'Beautiful Villa',
    'Four Sisters',
    'Nawawalang Paraiso'
]

describe("Recommendation Test", () => {

    test("Should return recommendations that has 'Laguna' as province", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "Laguna",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(laguna_names).toContain(element.accommodation.name)
        })
    });

    test("Should return recommend that has 'Metro Manila' as province, should only return one due to some not having reviews", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "Metro Manila",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result[0].accommodation.name).toEqual('Luxury Condo')
        expect(res.body.result.length).toBe(1)
    });

    test("Should return recommendations that has 'Laguna' as province and only return three results", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "Laguna",
               returnLength: 3,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(laguna_names).toContain(element.accommodation.name)
        })
        expect(res.body.result.length).toBe(3);
    });

    test("Should return recommendations that has 'Laguna' as province even with different casings", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "lAguNA",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(laguna_names).toContain(element.accommodation.name)
        })
    });

    test("Should return nothing - search by description should not work", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "Affordable dorms for students",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - search by price should not work", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "prices below 3700 monthly",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - search by amenities should not work", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "swimming pool",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - nonsensical input", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "loremIpsum dolor sitjkljkldskldfkjljdfskl",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });
});

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})