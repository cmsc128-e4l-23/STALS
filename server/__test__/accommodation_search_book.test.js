import request from "supertest";
import mongoose from 'mongoose';
import makeDB from "../mongoose";
import Accommodation from "../models/Accommodation";

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));

const url = "http://localhost:3001";

// data of interest
const lagunaNames = [
    'White House',
    'Big Bellys',
    'F Park',
    'Beautiful Villa',
    'Four Sisters',
    'Nawawalang Paraiso'
]
const lagunaIds = await Promise.all(lagunaNames.map(async (accname) => {
    const accomm = await Accommodation.findOne({name: accname})
    return accomm._id
}))

const manilaNames = [
    'Luxury Condo',
    'Cozy Apartment'
]
const manilaIds = await Promise.all(manilaNames.map(async (accname) => {
    const accomm = await Accommodation.findOne({name: accname})
    return accomm._id
}))

const trueUser = await User.findOne({email: 'mtate@gmail.com'})
const trueAccomm = await User.findOne({name: '100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!'})
const falseUser = await User.findOne({email: 'fching@gmail.com'})
const falseAccomm = await User.findOne({name: 'Nawawalang Paraiso'})

describe("Searching Test", () => {
    test("Should return accomms that has 'Laguna' as province", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
                searchString: "Laguna",
                returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        
        res.body.result.forEach(element => {
            expect(lagunaIds).toContain(element._id)
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
            expect(manilaIds).toContain(element._id)
        })
        expect(res.body.result.length).toBe(2)
    });

    test("Should return accomms that has 'Laguna' as province and only return three results", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
                searchString: "Laguna",
                returnLength: 3,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(lagunaIds).toContain(element._id)
        })
        expect(res.body.result.length).toBe(3);
    });

    test("Should return accomms that has 'Laguna' as province even with different casings", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "lAguNA",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(lagunaIds).toContain(element._id)
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

describe("Recommendation Test", () => {
    test("Should return recommendations that has 'Laguna' as province", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "Laguna",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        res.body.result.forEach(element => {
            expect(lagunaIds).toContain(element.accommodation._id)
        })
    });

    test("Should return recommend that has 'Metro Manila' as province, should only return one due to some not having reviews", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "Metro Manila",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        const targetAccomm = Accommodation.findOne({name: 'Luxury Condo'})
        expect(targetAccomm._id).toEqual(res.body.result[0].accommodation._id)
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
            expect(lagunaIds).toContain(element.accommodation._id)
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
            expect(lagunaIds).toContain(element.accommodation._id)
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

describe("Bookmark Test", () => {

    describe("Happy paths", () => {
        test("Should bookmark successfully", async () => {
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
            const res = await request(url).post("/bookmarkAccomm")
                .send({
                   user_id: trueUser._id,
                   accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });
    
        test("Bookmarking with incorrect user should not work", async () => {
            const res = await request(url).post("/bookmarkAccomm")
                .send({
                    user_id: falseUser._id,
                    accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });
    
        test("Bookmarking with incorrect accomm should not work", async () => {
            const res = await request(url).post("/bookmarkAccomm")
                .send({
                    user_id: trueUser._id,
                    accomm_id: falseUser._id
                },);
            expect(res.body.success).toBe(false);
        });
    
        test("Bookmarking with incorrect user and accomm should not work", async () => {
            const res = await request(url).post("/bookmarkAccomm")
                .send({
                    user_id: falseUser._id,
                    accomm_id: falseUser._id
                },);
            expect(res.body.success).toBe(false);
        });
    })
    
})

describe("Unbookmark Test", () => {

    describe("Happy paths", () => {
        test("Should unbookmark successfully", async () => {
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
            const res = await request(url).post("/removeBookmarkAccomm")
                .send({
                    user_id: trueUser._id,
                    accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });

        test("Unbookmarking with incorrect user should not work", async () => {
            const res = await request(url).post("/removeBookmarkAccomm")
                .send({
                    user_id: falseUser._id,
                    accomm_id: trueAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });

        test("Unbookmarking with incorrect accomm should not work", async () => {
            const res = await request(url).post("/removeBookmarkAccomm")
                .send({
                    user_id: trueUser._id,
                    accomm_id: falseAccomm._id
                },);
            expect(res.body.success).toBe(false);
        });

        test("Unbookmarking with incorrect user and accomm should not work", async () => {
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