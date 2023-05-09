// import accommodation from "../controllers/accommodation";
// import Accommodation from "../models/Accommodation";
// import User from "../models/User";

import request from "supertest";
const baseURL = "http://localhost:3001";
const testAccomm = "645a23db01e8d52bb114278a"; //actual working accomm id
const dudAccomm = "645a23db01e8d52bb114278b"; //non-existent accomm id

const newAccomm = {
    // "_id":{"$oid":"64534e45d46998fe6b1edb8d"},
    name :"UP DORM",
    owner : "6458b94082442da5c8771d93",
    landmarks :["Oblation","CAS Building"],
    address :{
        province :"Laguna",
        postCode:"1111",
        street :"Kalsada street",
        region :"Region IV",
        barangay:"Batong Malake",
        city :"Los Banos"
    },
    // generalLocation :{"$numberInt":"12345"},
    generalLocation: 12345,
    accommodationType :"Dorm",
    amenities :["Toiletries"],
    priceRange :{
        // minPrice :{"$numberInt":"500"},
        // maxPrice :{"$numberInt":"5000"},
        minPrice: 500,
        maxPrice: 5000,
        // _id :{"$oid":"645238b51aa6aebe2472273c"}
    },
    description :"Available to all UP Students",
    photos :["Photo 1","Photo 2"],
    restrictions :["No curfew","with WiFi"],
    security :"Very Secure",
    archived :false,
    reviews :[]
}

const editAccomm = {
    _id: '645a23db01e8d52bb114278a',
    name: 'Never',
    landmarks: [ 'Gonna' ],
    address: {
        postCode: 'Give',
        street: 'You',
        barangay: 'Up',
        city: 'Never',
        province: 'Gonna',
        region: 'Let'
    },
    generalLocation: 310771,
    accommodationType: 'You',
    amenities: [ 'Down' ],
    priceRange: {
        minPrice: 10000,
        maxPrice: 15000
    },
    description: 'Never gonna run around and desert you',
    photos: [ 'and' ],
    restrictions: ["desert", "you"],
    security: 'Rick Astley',
    archived: false
}

describe("Accommodation Tests", () => {

    //============================ Add Accommodation ============================
    test("should successfully add an accommodation to the database", async() => {
        const res = await request(baseURL).post("/addAccomm").send(newAccomm);
        // expect(res.body.success).toBe(true);
        expect(res.body).toHaveBeenCalledWith({
            success: true,
            msg: 'Successfully added accommodation',
        });
        console.log(res.body);

    });

    test("should fail to add accommodation due to same name error", async() => {
        const res = await request(baseURL).post("/addAccomm").send(newAccomm);
        expect(res.body.success).toBe(false);
    });

    test("should fail to add an accommodation due to same address error", async() => {
        const res = await request(baseURL).post("/addAccomm").send({...newAccomm, name: "DIFFERENT DORM"});
        expect(res.body.success).toBe(false);
    });

    test("should fail to add an accommodation due to 'User not found' error", async() => {
        const res = await request(baseURL).post("/addAccomm").send({...newAccomm, owner: "6458b94082442da5c8771d69"});
        expect(res.body.success).toBe(false);
    });

    //============================ Archive ============================
    test("should successfully archive an accommodation from database", async () => {
        const res = await request(baseURL).post("/archiveAccomm").send({ _id: testAccomm });
        expect(res.body.success).toBe(true);
    });

    test("should fail in archiving an accommodation from database", async () => {
        const res = await request(baseURL).post("/archiveAccomm").send({ _id: dudAccomm });
        expect(res.body.success).toBe(false);
    });

    test("should successfully unarchive an accommodation from database", async () => {
        const res = await request(baseURL).post("/unarchiveAccomm").send({ _id: testAccomm });
        expect(res.body.success).toBe(true);
    });

    test("should fail in unarchiving an accommodation from database", async () => {
        const res = await request(baseURL).post("/unarchiveAccomm").send({ _id: dudAccomm });
        expect(res.body.success).toBe(false);
    });

    //============================ Edit Accommodation ============================
    test("should successfully edit accommodation from database", async () => {
        const res = await request(baseURL).post("/editAccomm").send(editAccomm);
        expect(res.body.success).toBe(true);
    });

    test("should fail to edit accommodation due to accommodation not existing", async () => {
        const res = await request(baseURL).post("/editAccomm").send({...editAccomm, _id: "64534e45d46998fe6b1edb69"});
        expect(res.body.success).toBe(false);
    });

    //============================ Delete Accommodation ============================
    
});