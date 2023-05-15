import app from '../app';
import makeDB from '../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'));

var signup_details = {
    userType: "Student",
    firstName: "Nestor Harvey",
    lastName: "Garcia",
    email: "ngarcia@up.edu.ph",
    password: "garcia2020_02948",
    phoneNumber: "09957331927",
    birthday: "2002-05-07",
    sex: "Male"
}

describe("POST /signup", () => {
    test("Correct Parameters", async () => {
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(true)
    })
})

var login_details = {
    email: "ngarcia@up.edu.ph",
    password: "garcia2020_02948"
}

describe("POST /login", () => {
    test("Correct Existing User and Password", async () =>  {
        const response = await request(app).post("/login").send(login_details)
        console.log(response.body)
        expect(response.body.success).toBe(true)
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})