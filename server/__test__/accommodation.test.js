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