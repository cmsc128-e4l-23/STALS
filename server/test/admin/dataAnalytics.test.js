import mongoose from "mongoose";
import request from "supertest";
import axios from 'axios';

describe("POST /adminAnalytics", ()=>{
    test("should return a success value of true in the response body", async ()=>{
        // const response = request(app).post("http://localhost:3001/dataAnalytics").send({});
        // expect(response.body.success).toBe(true);
        const res = await axios.post("http://localhost:3001/dataAnalytics", {});

        expect(res.body.success).toBe(true);
    })
})
