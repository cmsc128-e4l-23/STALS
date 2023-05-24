import app from "../../app";
import request from "supertest";
import makeDB from "../../mongoose";
import mongoose from "mongoose";
import Accommodation from "../../models/Accommodation";
import User from "../../models/User";

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

// add mock data
const user1 = {
    userType: "Student",
    firstName: "Player 1",
    lastName: "Blank",
    email: "one@up.edu.ph",
    password: "player1blank",
    phoneNumber: "09123456789",
    birthday: "2002-05-07",
    sex: "Male"
}

const user2 = {
    userType: "Student",
    firstName: "Player 2",
    lastName: "Blank",
    email: "two@up.edu.ph",
    password: "player2blank",
    phoneNumber: "09987654321",
    birthday: "2002-05-08",
    sex: "Male"
}

const landchad = {
    userType: "Owner",
    firstName: "Player Three",
    lastName: "Blank",
    email: "landchad@up.edu.ph",
    password: "player3_blank",
    phoneNumber: "09957331927",
    birthday: "2002-05-09",
    sex: "Male"
}

const laguna1 = {
    name: "White House",
    owner: "landchad@up.edu.ph",
    landmarks: ["Mysterious Tree", "Landmark 2"],
    address: {
      postCode: "12345",
      street: "Mock Street",
      barangay: "Mock Barangay",
      city: "Mock City",
      province: "Laguna",
      region: "CALABARZON"
    },
    generalLocation: 1,
    accommodationType: "Rent",
    amenities: ["Pool", "Amenity 2"],
    priceRange: {
      minPrice: 1000,
      maxPrice: 2000
    },
    description: "This is a mock accommodation.",
    photos: ["photo1.jpg", "photo2.jpg"],
    restrictions: ["Restriction 1", "Restriction 2"],
    security: "Security details",
    archived: false,
    reviews: [] // Example review IDs
};

const laguna2 = {
    name: "Big Bellys",
    owner: "landchad@up.edu.ph",
    landmarks: ["Cozy Park", "Landmark 2"],
    address: {
      postCode: "67890",
      street: "Mock Street",
      barangay: "Mock Barangay",
      city: "Mock Town",
      province: "Laguna",
      region: "CALABARZON"
    },
    generalLocation: 1,
    accommodationType: "Transient",
    amenities: ["Amenity 1", "Diner Kitchen"],
    priceRange: {
      minPrice: 1000,
      maxPrice: 2000
    },
    description: "This is a mock accommodation.",
    photos: ["photo1.jpg", "photo2.jpg"],
    restrictions: ["Restriction 1", "Restriction 2"],
    security: "Security details",
    archived: false,
    reviews: [] // Example review IDs
};

const manila1 = {
    name: "Luxury Condo",
    owner: "landchad@up.edu.ph",
    landmarks: ["Landmark 1", "Luneta Park"],
    address: {
      postCode: "11111",
      street: "Mock Street",
      barangay: "Mock Barangay",
      city: "Ipsum City",
      province: "Metro Manila",
      region: "NCR"
    },
    generalLocation: 1,
    accommodationType: "Transient",
    amenities: ["Amenity 1", "Communal Kitchen"],
    priceRange: {
      minPrice: 1000,
      maxPrice: 2000
    },
    description: "This is a mock accommodation.",
    photos: ["photo1.jpg", "photo2.jpg"],
    restrictions: ["Restriction 1", "Restriction 2"],
    security: "Security details",
    archived: false,
    reviews: [] // Example review IDs
};

const manila2 = {
    name: "Cozy Apartment",
    owner: "landchad@up.edu.ph",
    landmarks: ["Landmark 1", "Landmark 2"],
    address: {
      postCode: "22222",
      street: "Mock Street",
      barangay: "Mock Barangay",
      city: "Lorem City",
      province: "Metro Manila",
      region: "NCR"
    },
    generalLocation: 1,
    accommodationType: "Dorm",
    amenities: ["Amenity 1", "Amenity 2"],
    priceRange: {
      minPrice: 1000,
      maxPrice: 2000
    },
    description: "This is a mock accommodation.",
    photos: ["photo1.jpg", "photo2.jpg"],
    restrictions: ["Restriction 1", "Restriction 2"],
    security: "Security details",
    archived: false,
    reviews: [] // Example review IDs
};

describe("Recommendation Test", () => {

    it("Mock Database Population", async () => {
        let result;
        result = await request(app).post("/signup").send(user1)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/signup").send(user2)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/signup").send(landchad)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/addAccomm").send(laguna1)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/addAccomm").send(laguna2)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/addAccomm").send(manila1)
        expect(result.body.success).toBe(true)
        result = await request(app).post("/addAccomm").send(manila2)
        expect(result.body.success).toBe(true)
        // there should be three users and four accomms
        const usercount = await User.count();
        expect(usercount).toBe(3);
        const accommcount = await Accommodation.count();
        expect(accommcount).toBe(4);
        // add reviews here, 10 per accomm

        const laguna1data = await Accommodation.findOne({name: "White House"})
        for (let i=0; i<10; i++) {
            const randrate = Math.floor(Math.random() * 6)
            result = await request(app).post("/addReview").send({
                user: "one@up.edu.ph",
                propertyId: (laguna1data._id).toString(),
                content: "Sample Content",
                rating: randrate,
                photos: [{ filename: "Photo1" }]
            })
            expect(result.body.success).toBe(true)
        }

        const laguna2data = await Accommodation.findOne({name: "Big Bellys"})
        for (let i=0; i<10; i++) {
            const randrate = Math.floor(Math.random() * 6)
            result = await request(app).post("/addReview").send({
                user: "two@up.edu.ph",
                propertyId: (laguna2data._id).toString(),
                content: "Sample Content",
                rating: randrate,
                photos: [{ filename: "Photo1" }]
            })
            expect(result.body.success).toBe(true)
        }

        const manila1data = await Accommodation.findOne({name: "Luxury Condo"})
        for (let i=0; i<10; i++) {
            result = await request(app).post("/addReview").send({
                user: "one@up.edu.ph",
                propertyId: (manila1data._id).toString(),
                content: "Sample Content",
                rating: i%5,
                photos: [{ filename: "Photo1" }]
            })
            expect(result.body.success).toBe(true)
        }
        // the second manila one intentionally has no reviews
    })

    test("Should return recommendations that has 'Laguna' as province", async () => {
        const res = await request(app).post("/recommendAccomm")
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
        const res = await request(app).post("/recommendAccomm")
            .send({
               searchString: "Metro Manila",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result[0].accommodation.name).toEqual('Luxury Condo')
        expect(res.body.result.length).toBe(1)
    });

    test("Should return an accurate rating", async () => {
        const res = await request(app).post("/recommendAccomm")
            .send({
               searchString: "Metro Manila",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result[0].accommodation.name).toEqual('Luxury Condo')
        expect(res.body.result[0].rating).toBeCloseTo(2)
        expect(res.body.result[0].ratingNum).toEqual(10)
        expect(res.body.result.length).toBe(1)
    });

    test("Should return recommendations that has 'Laguna' as province and only return one result", async () => {
        const res = await request(app).post("/recommendAccomm")
            .send({
               searchString: "Laguna",
               returnLength: 1,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(laguna_names).toContain(element.accommodation.name)
        })
        expect(res.body.result.length).toBe(1);
    });

    test("Should return recommendations that has 'Laguna' as province even with different casings", async () => {
        const res = await request(app).post("/recommendAccomm")
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
        const res = await request(app).post("/recommendAccomm")
            .send({
               searchString: "Affordable dorms for students",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Should return nothing - search by price should not work", async () => {
        const res = await request(app).post("/recommendAccomm")
            .send({
               searchString: "prices below 3700 monthly",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(0);
    });

    test("Search by accommodation type - laguna1 should return", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "Rent",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(1);
        expect(res.body.result[0].name).toEqual(laguna1.name);
    });

    test("Search by landmark - laguna1 should return", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "Mysterious Tree",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(1);
        expect(res.body.result[0].name).toEqual(laguna1.name);
    });

    test("Search by amenity - laguna1 should return", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "Pool",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(1);
        expect(res.body.result[0].name).toEqual(laguna1.name);
    });

    test("Multiple accomm types - laguna2 and manila1 should return", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "transient",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(2);
        res.body.result.forEach(element => {
            expect([laguna2.name, manila1.name]).toContain(element.name)
        })
    });

    test("Multiple Landmarks - laguna2 and manila1 should return", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "park",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(2);
        res.body.result.forEach(element => {
            expect([laguna2.name, manila1.name]).toContain(element.name)
        })
    });

    test("Multiple Amenities - laguna2 and manila1 should return", async () => {
        const res = await request(app).post("/searchAccomm")
            .send({
               searchString: "kitchen",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect(res.body.result.length).toEqual(2);
        res.body.result.forEach(element => {
            expect([laguna2.name, manila1.name]).toContain(element.name)
        })
    });
});

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})