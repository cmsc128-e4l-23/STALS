// import accommodation from "../controllers/accommodation";
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
    description: "This is a mock accommodation.",
    photos: ["photo1.jpg", "photo2.jpg"],
    restrictions: ["Restriction 1", "Restriction 2"],
    security: "Security details",
    archived: false,
    reviews: ["615ab89dcf32a1a234567891", "615ab89dcf32a1a234567892"] // Example review IDs
};

//ACCOMMODATIONS TO BE USED FOR THE FUTURE TESTS
let newAccomm;
let editAccomm;

describe("Accommodation Tests", () => {

    //============================ Add Accommodation ============================
    test("should successfully add an accommodation to the database", async() => {
        const res = await request(baseURL).post("/addAccomm").send(mockAccomm);
        expect(res.body).toEqual({
            "success": true,
            "msg": "Successfully added accommodation"
        });
        
        //Getting added accommodation to be used for future testing
        newAccomm = await Accommodation.findOne({ name: "Mock Accommodation" });

        //Mock document to be used for edit tests
        editAccomm = {
            _id: newAccomm._id,
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
    });

    test("should fail to add accommodation due to same name error", async() => {
        const res = await request(baseURL).post("/addAccomm").send(newAccomm);
        expect(res.body).toEqual({
            "error": "Accommodation with the same name already exists",
            "msg": "Unsuccessfully added accommodation",
            "success": false
        });
    });

    test("should fail to add an accommodation due to same address error", async() => {
        const res = await request(baseURL).post("/addAccomm").send({...newAccomm, name: "DIFFERENT DORM"});
        expect(res.body).toEqual({
            "error": "Accommodation with the same address already exists",
            "msg": "Unsuccessfully added accommodation",
            "success": false
        });
    });

    test("should fail to add an accommodation due to 'User not found' error", async() => {
        const res = await request(baseURL).post("/addAccomm").send({...newAccomm, owner: "6458b94082442da5c8771d69"});
        expect(res.body).toEqual({"error": "User not found", "msg": "Unsuccessfully added accommodation","success": false});
    });
});


    //============================ Archive ============================
    test("should successfully archive an accommodation from database", async () => {
        const res = await request(baseURL).post("/archiveAccomm").send(newAccomm._id);
        expect(res.body.success).toBe(true);
    });

    test("should fail in archiving an accommodation from database", async () => {
        const res = await request(baseURL).post("/archiveAccomm").send({ _id: "645a23db01e8d52bb114278b" });
        expect(res.body).toEqual({
            "error": "Failed to find and archive accommodation",
            "msg": "Unsuccessfully archived accommodation",
            "success": false,
        });
    });

    test("should successfully unarchive an accommodation from database", async () => {
        const res = await request(baseURL).post("/unarchiveAccomm").send(newAccomm._id);
        expect(res.body.success).toBe(true);
    });

    test("should fail in unarchiving an accommodation from database", async () => {
        const res = await request(baseURL).post("/unarchiveAccomm").send({ _id: "645a23db01e8d52bb114278b" });
        expect(res.body).toEqual({
            "error": "Failed to find and unarchive accommodation",
            "msg": "Unsuccessfully unarchived accommodation",
            "success": false,
        });
    });

    //============================ Edit Accommodation ============================
    test("should successfully edit accommodation from database", async () => {
        const res = await request(app).post("/editAccomm").send(editAccomm);
        expect(res.body.success).toBe(true);
    });

    test("should fail to edit accommodation due to accommodation not existing", async () => {
        const res = await request(baseURL).post("/editAccomm").send({...editAccomm, _id: "64534e45d46998fe6b1edb69"});
        expect(res.body.success).toBe(false);
        expect(res.body).toEqual({"error": "Accommodation not found.", "msg": "Unsuccessfully edited accommodation", "success": false});
    });

    //============================ Delete Accommodation ============================
    test("should successfully delete accommodation", async () => {
        // const currAccomm = await Accommodation.findOne({ name: "Mock Accommodation" });
        const res = await request(baseURL).post("/deleteAccomm").send(newAccomm._id);
        expect(res.body.success).toBe(true);
    });

    test("should fail to delete accommodation due to non-existent accommodation", async () => {
        const res = await request(baseURL).post("/deleteAccomm").send({ _id: "615ab89dcf32a1a234555555" });
        expect(res.body).toEqual({
            "error": "Failed to find and delete accommodation",
            "msg": "Unsuccessful deleted accommodation",
            "success": false,
        });
    });

    test("should fail to edit owner's property list at accommodation deletion due to incorrect user id", async () => {
        //creating the mock accommodation
        await request(baseURL).post("/addAccomm").send(newAccomm);
        
        const res = await request(baseURL).post("/deleteAccomm").send({...newAccomm, owner: "645a23db01e8d52bb114278b"});
        expect(res.body).toEqual({
            "error": "Failed to find and edit propertyList of current user",
            "msg": "Unsuccessful deleted accommodation",
            "success": false
        });
    });
    
});

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})