import app from '../app';
import makeDB from '../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))



describe("POST /resolveReport", () =>{
    // test("should return the response for a successful resolveReport", async ()=>{
    //     const res = await request(baseURL).post("/resolveReport").send({_id: pendingId});
    //     expect(res.body.success).toBe(true); 
    //     expect(res.body.msg).toBe("Resolving succeeded"); 
    // });

    // test("should return the response for unsuccessful resolve", async ()=>{
    //     const res = await request(baseURL).post("/resolveReport").send({_id: "pendingId"});
    //     expect(res.body.success).toBe(false); 
    //     expect(res.body.msg).toBe("Resolving failed"); 
    // });

    
})


afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})