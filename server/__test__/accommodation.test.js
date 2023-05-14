import request from "supertest";

const url = "http://localhost:3001";
describe("Searching Test", () => {
    test("Should return accomms that has 'Laguna' as province", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "Laguna"
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

    test("Should return accomms that has 'Laguna' as province even with different casings", async () => {
        const res = await request(url).post("/searchAccomm")
            .send({
               searchString: "lAguNA"
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
});