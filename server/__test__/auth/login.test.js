import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

// Set up for login test starts here
var signup_details = {
    userType: "Student",
    firstName: "Edgar Aaron",
    lastName: "Go",
    email: "eago1@up.edu.ph",
    password: "eightchars",
    phoneNumber: "09997027021",
    birthday: "2002-12-05",
    sex: "Male"
}

describe("POST /signup", () => {
    test("Adding user for login testing", async () => {
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(true)
        expect(response.body.msg).toBe("User created successfully")
    })
})
// Set up for login test ends here

// Initial details for logging in
var login_details = {
    email: "eago1@up.edu.ph",
    password: "eightchars",
}

// Test for correct parameters or details
describe("POST /login", () => {
    test("Correct Parameters / Successful log in", async () => {
        const response = await request(app).post("/login").send(login_details)
        console.log(response.body)
        expect(response.body.success).toBe(true)
    })
})

// Test to check if it handles error of an incorrect password input
describe("POST /login", () => {
    test("Incorrect password input", async () => {
        login_details.password = "sevenchars"     // Password not associated with the current email
        const response = await request(app).post("/login").send(login_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("Incorrect Password")
    })
})

// Test to check if it handles error of the email/user not existing in the database
describe("POST /login", () => {
    test("Email input that does not exist in the database", async () => {
        login_details.email = "eago1@gmail.com"     // Non existent email in the database
        const response = await request(app).post("/login").send(login_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("User not found")
    })
})

// Test to check if missing fields are handled.
describe("POST /login", () => {
    test("Field with missing information", async () => {
        login_details.email = ""                    // Represents an empty field
        const response = await request(app).post("/login").send(login_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("User not found")
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})