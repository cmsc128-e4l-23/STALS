import app from '../app';
import makeDB from '../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import Accommodation from '../models/Accommodation';
import User from '../models/User';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));

const mockUser = {
    userType: "Owner",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "password123",
    phoneNumber: "09123456789",
    birthday: "1990-01-01",
    profilePhoto: "https://example.com/profile-photo.jpg",
    sex: "Male",
    verificationFiles: ["https://example.com/verification-file1.jpg", "https://example.com/verification-file2.jpg"],
    reviews: [],
    reports: [],
    bookmarks: [],
    owner: {
      propertiesList: [],
      archivedList: [],
      status: "active"
    },
    admin: {
      pendingApplications: [],
      pendingReports: []
    }
};

const mockAccomm = {
    name: "Mock Accommodation",
    owner: "johndoe@example.com",
    landmarks: ["Landmark 1", "Landmark 2"],
    address: {
      postCode: "12345",
      street: "Mock Street",
      barangay: "Mock Barangay",
      city: "Mock City",
      province: "Laguna",
      region: "CALABARZON"
    },
    generalLocation: 1,
    accommodationType: "Transient",
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
    reviews: ["615ab89dcf32a1a234567891", "615ab89dcf32a1a234567892"] // Example review IDs
};

//ACCOMMODATIONS TO BE USED FOR THE FUTURE TESTS
let newAccomm;
let editAccomm;

describe("POST /addAccomm", () => {
    describe("Happy paths", () => {
        test("should successfully add an accommodation to the database", async() => {
            //adding a new user to the database
            await request(app).post("/signup").send(mockUser);
    
            //adding accommodation to the database
            const res = await request(app).post("/addAccomm").send(mockAccomm);
            expect(res.body.success).toBe(true);
            expect(res.body.msg).toBe("Successfully added accommodation");
            
            //Getting added accommodation to be used for future testing
            newAccomm = await Accommodation.findOne({ name: mockAccomm.name });
    
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
    });

    describe("Unhappy paths", () => {
        test("should fail to add accommodation due to same name error", async() => {
            const res = await request(app).post("/addAccomm").send(mockAccomm);
            expect(res.body.success).toEqual(false);
            expect(res.body.msg).toEqual("Unsuccessfully added accommodation");
            expect(res.body.error).toEqual("Accommodation with the same name already exists");
        });

        test("should fail to add an accommodation due to same address error", async() => {
            const res = await request(app).post("/addAccomm").send({...mockAccomm, name: "DIFFERENT DORM"});
            expect(res.body.success).toEqual(false);
            expect(res.body.msg).toEqual("Unsuccessfully added accommodation");
            expect(res.body.error).toEqual("Accommodation with the same address already exists");
        });

        test("should fail to add an accommodation due to 'User not found' error", async() => {
            const res = await request(app).post("/addAccomm").send({...mockAccomm, owner: "random@email.com"});
            expect(res.body.success).toEqual(false);
            expect(res.body.msg).toEqual("Unsuccessfully added accommodation");
            expect(res.body.error).toEqual("User not found");
        });
    });
});


describe("POST /archiveAccomm", () => {
    describe("Happy paths", () => {
        test("should successfully archive an accommodation from database", async () => {
            const res = await request(app).post("/archiveAccomm").send({_id: newAccomm._id});
            expect(res.body.success).toBe(true);
        });
    })

    describe("Unhappy paths", () => {
        test("should fail in archiving an accommodation from database due to incorrect accommodation id", async () => {
            const res = await request(app).post("/archiveAccomm").send({ _id: "645a23db01e8d52bb114278b" });
            expect(res.body.success).toEqual(false);
            expect(res.body.msg).toEqual("Unsuccessfully archived accommodation");
            expect(res.body.error).toEqual("Failed to find and archive accommodation");
        });
    })  
})

describe("POST /unarchiveAccomm", () => {
    describe("Happy paths", () => {
        test("should successfully unarchive an accommodation from database due to incorrect accommodation id", async () => {
            const res = await request(app).post("/unarchiveAccomm").send({_id: newAccomm._id});
            expect(res.body.success).toBe(true);
        });
    })

    describe("Unhappy paths", () => {
        test("should fail in unarchiving an accommodation from database", async () => {
            const res = await request(app).post("/unarchiveAccomm").send({ _id: "645a23db01e8d52bb114278b" });
            expect(res.body.success).toEqual(false);
            expect(res.body.msg).toEqual("Unsuccessfully unarchived accommodation");
            expect(res.body.error).toEqual("Failed to find and unarchive accommodation");
        });
    })  
})

describe("POST /editAccomm", () => {
    describe("Happy paths", () => {
        test("should successfully edit accommodation from database", async () => {
            const res = await request(app).post("/editAccomm").send(editAccomm);
            expect(res.body.success).toBe(true);
        });
    })

    describe("Unhappy paths", () => {
        test("should fail to edit accommodation due to accommodation not existing", async () => {
            const res = await request(app).post("/editAccomm").send({...editAccomm, _id: "64534e45d46998fe6b1edb69"});
            expect(res.body.success).toBe(false);
            expect(res.body.msg).toBe("Unsuccessfully edited accommodation");
            expect(res.body.error).toBe("Accommodation not found");
        });
    })  
})

describe("POST /deleteAccomm", () => {
    describe("Happy paths", () => {
        test("should successfully delete accommodation", async () => {
            const res = await request(app).post("/deleteAccomm").send({_id: newAccomm._id});
            expect(res.body.success).toBe(true);
        });
    })

    describe("Unhappy paths", () => {
        test("should fail to delete accommodation due to non-existent accommodation", async () => {
            const res = await request(app).post("/deleteAccomm").send({ _id: "615ab89dcf32a1a234555555" });
            expect(res.body.success).toBe(false);
            expect(res.body.msg).toBe("Unsuccessfully deleted accommodation");
            expect(res.body.error).toBe("Failed to find and delete accommodation");
        });

        test("should fail to edit owner's property list at accommodation deletion due to incorrect user id", async () => {
            //adding a mock accommodation
            const result = await request(app).post("/addAccomm").send(mockAccomm);
            newAccomm = await Accommodation.findOne({name: mockAccomm.name});
            
            //editing the mock accommodation
            const result1 = await request(app).post("/editAccomm").send({_id: newAccomm._id, owner: "615ab89dcf32a1a2345abcde"});
            newAccomm = await Accommodation.findOne({name: mockAccomm.name})
            

            const res = await request(app).post("/deleteAccomm").send({_id: newAccomm._id});
            expect(res.body.success).toBe(false);
            expect(res.body.msg).toBe("Unsuccessfully deleted accommodation");
            expect(res.body.error).toBe("Failed to find and edit propertyList of current user");
        });
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})

const url = "http://localhost:3001";
describe("Searching Test", () => {
    test("Should return accomms that has 'Laguna' as province", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "Laguna",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        const expectids = [
            '644cdb964c5e0d977fa685ac',
            '644cdb964c5e0d977fa685af',
            '644cdb964c5e0d977fa685b2',
            '644ce1aad31be0a75c33df74',
            '644e58b2f157a1f22a80e73b',
            '644e58b2f157a1f22a80e738'
        ]
        res.body.result.forEach(element => {
            expect(expectids).toContain(element._id)
        })
    });

    test("Should return accomms that has 'Metro Manila' as province", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "Metro Manila",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        const expectids = [
            '644ce1aad31be0a75c33df6b',
            '644ce1aad31be0a75c33df71',
        ]
        res.body.result.forEach(element => {
            expect(expectids).toContain(element._id)
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
        const expectids = [
            '644cdb964c5e0d977fa685ac',
            '644cdb964c5e0d977fa685af',
            '644cdb964c5e0d977fa685b2',
            '644ce1aad31be0a75c33df74',
            '644e58b2f157a1f22a80e73b',
            '644e58b2f157a1f22a80e738'
        ]
        res.body.result.forEach(element => {
            expect(expectids).toContain(element._id)
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
        const expectids = [
            '644cdb964c5e0d977fa685ac',
            '644cdb964c5e0d977fa685af',
            '644cdb964c5e0d977fa685b2',
            '644ce1aad31be0a75c33df74',
            '644e58b2f157a1f22a80e73b',
            '644e58b2f157a1f22a80e738'
        ]
        res.body.result.forEach(element => {
            expect(expectids).toContain(element._id)
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
        const expectids = [
            '644cdb964c5e0d977fa685ac',
            '644cdb964c5e0d977fa685af',
            '644cdb964c5e0d977fa685b2',
            '644ce1aad31be0a75c33df74',
            '644e58b2f157a1f22a80e73b',
            '644e58b2f157a1f22a80e738'
        ]
        res.body.result.forEach(element => {
            expect(expectids).toContain(element.accommodation._id)
        })
    });

    test("Should return recommend that has 'Metro Manila' as province, should only return one due to some not having reviews", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "Metro Manila",
               returnLength: 10,
            },);
        expect(res.body.success).toBe(true);
        expect("644ce1aad31be0a75c33df6b").toEqual(res.body.result[0].accommodation._id)
        expect(res.body.result.length).toBe(1)
    });

    test("Should return recommendations that has 'Laguna' as province and only return three results", async () => {
        const res = await request(url).post("/recommendAccomm")
            .send({
               searchString: "Laguna",
               returnLength: 3,
            },);
        expect(res.body.success).toBe(true);
        const expectids = [
            '644cdb964c5e0d977fa685ac',
            '644cdb964c5e0d977fa685af',
            '644cdb964c5e0d977fa685b2',
            '644ce1aad31be0a75c33df74',
            '644e58b2f157a1f22a80e73b',
            '644e58b2f157a1f22a80e738'
        ]
        res.body.result.forEach(element => {
            expect(expectids).toContain(element.accommodation._id)
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
        const expectids = [
            '644cdb964c5e0d977fa685ac',
            '644cdb964c5e0d977fa685af',
            '644cdb964c5e0d977fa685b2',
            '644ce1aad31be0a75c33df74',
            '644e58b2f157a1f22a80e73b',
            '644e58b2f157a1f22a80e738'
        ]
        res.body.result.forEach(element => {
            expect(expectids).toContain(element.accommodation._id)
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
    test("Should bookmark successfully", async () => {
        const res = await request(url).post("/bookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7d1513',
               accomm_id: '644e58b2f157a1f22a80e741'
            },);
        expect(res.body.success).toBe(true);
    });

    test("Bookmarking with the same user and accomm should not work", async () => {
        const res = await request(url).post("/bookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7d1513',
               accomm_id: '644e58b2f157a1f22a80e741'
            },);
        expect(res.body.success).toBe(false);
    });

    test("Bookmarking with non-existent user should not work", async () => {
        const res = await request(url).post("/bookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7dffff',
               accomm_id: '644e58b2f157a1f22a80e741'
            },);
        expect(res.body.success).toBe(false);
    });

    test("Bookmarking with non-existent accomm should not work", async () => {
        const res = await request(url).post("/bookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7d1513',
               accomm_id: '644e58b2f157a1f22a80ffff'
            },);
        expect(res.body.success).toBe(false);
    });

    test("Bookmarking with non-existent user and accomm should not work", async () => {
        const res = await request(url).post("/bookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7dffff',
               accomm_id: '644e58b2f157a1f22a80ffff'
            },);
        expect(res.body.success).toBe(false);
    });
})

describe("Unbookmark Test", () => {
    test("Should unbookmark successfully", async () => {
        const res = await request(url).post("/removeBookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7d1513',
               accomm_id: '644e58b2f157a1f22a80e741'
            },);
        expect(res.body.success).toBe(true);
    });

    test("Unbookmarking with the same user and accomm should not work", async () => {
        const res = await request(url).post("/removeBookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7d1513',
               accomm_id: '644e58b2f157a1f22a80e741'
            },);
        expect(res.body.success).toBe(false);
    });

    test("Unbookmarking with non-existent user should not work", async () => {
        const res = await request(url).post("/removeBookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7dffff',
               accomm_id: '644e58b2f157a1f22a80e741'
            },);
        expect(res.body.success).toBe(false);
    });

    test("Unbookmarking with non-existent accomm should not work", async () => {
        const res = await request(url).post("/removeBookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7d1513',
               accomm_id: '644e58b2f157a1f22a80ffff'
            },);
        expect(res.body.success).toBe(false);
    });

    test("Unbookmarking with non-existent user and accomm should not work", async () => {
        const res = await request(url).post("/removeBookmarkAccomm")
            .send({
               user_id: '644cd8a4dad90ff1fc7dffff',
               accomm_id: '644e58b2f157a1f22a80ffff'
            },);
        expect(res.body.success).toBe(false);
    });
})