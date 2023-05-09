import request from "supertest";

const baseURL = "http://localhost:3001";

describe("/dataAnalytics Test", () =>{
    test("should return a success value of true", async ()=>{
        const res = await request(baseURL).post("/dataAnalytics").send({});
        expect(res.body.success).toBe(true); 
    });

    test("the return key in the response body should return an object", async ()=>{
        const res = await request(baseURL).post("/dataAnalytics").send({});
        expect(typeof(res.body.return)).toBe("object"); 
    });

    test("the msg key in the response body should return the correct message", async ()=>{
        const res = await request(baseURL).post("/dataAnalytics").send({});
        expect(res.body.msg).toBe("Successfully retrieve admin data"); 
    })
})