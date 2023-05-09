import request from "supertest";
const baseURL = "http://localhost:3001";

describe("/viewReports Test", () =>{
    test("should return the response for a successful view", async ()=>{
        const res = await request(baseURL).post("/viewReports").send({
            onlyPending: true,
            onlyResolved: true
        });
        // console.log(res.body);
        expect(res.body.success).toBe(true); 
        expect(res.body.msg).toBe("Viewing Succeeded"); 
    });

    test("should return the response for a successful view", async ()=>{
        const res = await request(baseURL).post("/viewReports").send({
            onlyPending: false,
            onlyResolved: true
        });
        // console.log(res.body);
        expect(res.body.success).toBe(true); 
        expect(res.body.msg).toBe("Viewing Succeeded"); 
    });

    test("should return the response for a successful view", async ()=>{
        const res = await request(baseURL).post("/viewReports").send({
            onlyPending: true,
            onlyResolved: false
        });
        // console.log(res.body);
        expect(res.body.success).toBe(true); 
        expect(res.body.msg).toBe("Viewing Succeeded"); 
    });

    test("should return the response for a successful view", async ()=>{
        const res = await request(baseURL).post("/viewReports").send({
            onlyPending: false,
            onlyResolved: false
        });
        // console.log(res.body);
        expect(res.body.success).toBe(false); 
        expect(res.body.msg).toBe("onlyPending and onlyResolved in the request body have no 'true' values"); 
    });
})