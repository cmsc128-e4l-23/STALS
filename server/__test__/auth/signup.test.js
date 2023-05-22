import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

// Initial details for signing up
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

// Test for correct parameters or details
describe("POST /signup", () => {
    test("Correct Parameters / Successful sign up", async () => {
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(true)
        expect(response.body.msg).toBe("User created successfully")
    })
})

// Test to check if it handles error of an incorrect email format
describe("POST /signup", () => {
    test("Invalid email format in input", async () => {
        signup_details.email = "eago1@gmailcom"             // Incorrect email; does not follow email regex
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("Invalid email format")
    })
})

// Test to check if it handles error of the email being in the database already
describe("POST /signup", () => {
    test("Email already exists in database", async () => {
        signup_details.email = "ngarcia@up.edu.ph"          // This email is already an existing user
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("Email already exists")
    })
})

// Test to check if it handles error of the password being less than eight characters.
describe("POST /signup", () => {
    test("Password length is less than 8 characters", async () => {
        signup_details.email = "eago1@gmail.com"            // Reset the email field to a valid one
        signup_details.password = "sevenle"                 // Password with only seven letters
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("Password should be at least 8 characters long")
    })
})

// Test to check if it handles error of an incorrect phone number format
describe("POST /signup", () => {
    test("Invalid phone number format in input", async () => {
        signup_details.password = "sevenlet"                // Reset the password to a valid one
        signup_details.phoneNumber = "99997027021"          // Phone number that does not follow the format/regex
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("Invalid phone number")
    })
})

// Test to check if it handles error of the phone number being in the database already
describe("POST /signup", () => {
    test("Phone number already exists in database", async () => {
        signup_details.phoneNumber = "09957331927"          // Phone number already exists in the database
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("Phone number already exists")
    })
})

// Test to check if it handles error of the birthday value being set to the future
describe("POST /signup", () => {
    test("Birthday input is set in the future", async () => {
        signup_details.phoneNumber = "09997027021"          // Reset phone number to a valid one
        signup_details.birthday = "2023-07-01"              // Set birthday to be in the future
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("Invalid birthday")
    })
})

// Test to check if missing fields are handled.
describe("POST /signup", () => {
    test("Field with missing information", async () => {
        signup_details.birthday = "2021-07-01"
        signup_details.firstName = ""                       // Represents an empty field
        const response = await request(app).post("/signup").send(signup_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
        .then(() => mongoose.connection.close())
})