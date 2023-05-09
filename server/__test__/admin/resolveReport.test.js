import request from "supertest";
const baseURL = "http://localhost:3001";

//Provide an id of a pending report in database to utilize the resolveReport
// const pendingId = "64590ef70727f84cb1e8a472"


describe("/resolveReport Test", () =>{
    // test("should return the response for a successful resolveReport", async ()=>{
    //     const res = await request(baseURL).post("/resolveReport").send({_id: pendingId});
    //     expect(res.body.success).toBe(true); 
    //     expect(res.body.msg).toBe("Resolving succeeded"); 
    // });

    test("should return the response for unsuccessful resolve", async ()=>{
        const res = await request(baseURL).post("/resolveReport").send({_id: "pendingId"});
        expect(res.body.success).toBe(false); 
        expect(res.body.msg).toBe("Resolving failed"); 
    });
})