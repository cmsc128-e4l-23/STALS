import request from "supertest";

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