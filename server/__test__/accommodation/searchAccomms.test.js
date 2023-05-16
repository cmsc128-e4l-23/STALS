import app from "../../app";
import request from "supertest";
import makeDB from "../../mongoose";
import mongoose from "mongoose";
import Accommodation from "../../models/Accommodation";

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));

const url = "http://localhost:3001";

// simplified data
const laguna_names = [
    'White House',
    'Big Bellys',
]
const manila_names = [
    'Luxury Condo',
    'Cozy Apartment'
]

// list of mock data
const landchad = {
    userType: "Owner",
    firstName: "Player 3",
    lastName: "Blank",
    email: "landchad@up.edu.ph",
    password: "player3blank",
    phoneNumber: "06666666666",
    birthday: "2002-05-09",
    sex: "Male"
}

const laguna1 = {
    name: "White House",
    owner: "landchad@up.edu.ph",
    address: {
      postCode: "12345",
      street: "Mock Street",
      barangay: "Mock Barangay",
      city: "Mock City",
      province: "Laguna",
      region: "CALABARZON"
    },
};

const laguna2 = {
    name: "Big Bellys",
    owner: "landchad@up.edu.ph",
    address: {
      postCode: "67890",
      street: "Mock Street",
      barangay: "Mock Barangay",
      city: "Mock City",
      province: "Laguna",
      region: "CALABARZON"
    },
};

const manila1 = {
    name: "Luxury Condo",
    owner: "landchad@up.edu.ph",
    address: {
      postCode: "11111",
      street: "Mock Street",
      barangay: "Mock Barangay",
      city: "Mock City",
      province: "Metro Manila",
      region: "NCR"
    },
};

const manila2 = {
    name: "Cozy Apartment",
    owner: "landchad@up.edu.ph",
    address: {
      postCode: "22222",
      street: "Mock Street",
      barangay: "Mock Barangay",
      city: "Mock City",
      province: "Metro Manila",
      region: "NCR"
    },
};

describe("Searching Test", () => {

    it("Mock Database Population", async () => {
        await request(app).post("/signup").send(landchad)
        await request(app).post("/addAccomm").send(laguna1)
        await request(app).post("/addAccomm").send(laguna2)
        await request(app).post("/addAccomm").send(manila1)
        await request(app).post("/addAccomm").send(manila2)
        // there should be one user and four accomms
        const usercount = await User.count();
        expect(usercount).toBe(1);
        const accommcount = await Accommodation.count();
        expect(accommcount).toBe(4);
    })

    test("Should return accomms that has 'Laguna' as province", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
                searchString: "Laguna",
                returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(laguna_names).toContain(element.name)
        })
        expect(res.body.result.length).toBe(2)
    });

    test("Should return accomms that has 'Metro Manila' as province", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
                searchString: "Metro Manila",
                returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(manila_names).toContain(element.name)
        })
        expect(res.body.result.length).toBe(2)
    });

    test("Should return accomms that has 'Laguna' as province and only returns one result", async () => {
        const res = await request(app).post("/searchAccomm")
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
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "lAguNA",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(laguna_names).toContain(element.name)
        })
        expect(res.body.result.length).toBe(2)
    });

    test("Should return nothing - search by description should not work", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "Affordable dorms for students",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - search by price should not work", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "prices below 3700 monthly",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - search by amenities should not work", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "swimming pool",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - nonsensical input", async () => {
        const res = await request(app).post("/searchAccomm")
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