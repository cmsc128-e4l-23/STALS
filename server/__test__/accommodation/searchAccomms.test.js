import app from "../../app";
import request from "supertest";
import makeDB from "../../mongoose";

// simplified data
const laguna_names = ['White House', 'Big Bellys']
const manila_names = ['Luxury Condo', 'Cozy Apartment']
const mock_accomms = [
    {
        name: "White House",
        address: {
            province: "Laguna",
        },
        amenities: "Free Wi-Fi",
        description: "Presidential suite",
        priceRange: { minPrice: 5000, maxPrice: 10000}
    },
    {
        name: "Big Bellys",
        address: {
            province: "Laguna",
        },
        amenities: "Free Wi-Fi",
        description: "Presidential suite",
        priceRange: { minPrice: 5000, maxPrice: 10000}
    },
    {
        name: "Luxury Condo",
        address: {
            province: "Metro Manila",
        },
        amenities: "Free Wi-Fi",
        description: "Presidential suite",
        priceRange: { minPrice: 5000, maxPrice: 10000}
    },
    {
        name: "Cozy Apartment",
        address: {
            province: "Metro Manila",
        },
        amenities: "Free Wi-Fi",
        description: "Presidential suite",
        priceRange: { minPrice: 5000, maxPrice: 10000}
    }
]

const url = "http://localhost:3001";

beforeAll(async () => {makeDB('mongodb://0.0.0.0:27017/STALS_TEST')});

describe("Searching Test", () => {

    it("Data Initialization", async() => {
        for (let accomm of mock_accomms) {
            (await request(app).post("/addAccomm")).send(accomm)
        }
    })

    test("Should return accomms that has 'Laguna' as province", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
                searchString: "Laguna",
                returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(laguna_names).toContain(element.name)
        })
    });

    test("Should return accomms that has 'Metro Manila' as province", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
                searchString: "Metro Manila",
                returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(manila_names).toContain(element.name)
        })
    });

    test("Should return accomms that has 'Laguna' as province and only returns one result", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
                searchString: "Laguna",
                returnLength: 1,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(laguna_names).toContain(element.name)
        })
        expect(res.body.result.length).toBe(1);
    });

    test("Should return accomms that has 'Laguna' as province even with different casings", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "lAguNA",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(laguna_names).toContain(element.name)
        })
    });

    test("Should return nothing - search by description should not work", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "Affordable dorms for students",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - search by price should not work", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "prices below 3700 monthly",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - search by amenities should not work", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "swimming pool",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - nonsensical input", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "loremIpsum dolor sitjkljkldskldfkjljdfskl",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });
});