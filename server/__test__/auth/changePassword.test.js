import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

// Set up for change password test starts here
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

var login_details = {
    email: "eago1@up.edu.ph",
    password: "eightchars",
}

describe("POST /login", () => {
    test("Logging in for cookies testing", async () => {
        const response = await request(app).post("/login").send(login_details)
        console.log(response.body)
        expect(response.body.success).toBe(true)
    })
})
// Set up for change password test ends here

// Initial details for changing password
var pass_change_details = {
    user_email: "eago1@up.edu.ph",
    old_password: "eightchars",
    new_password: "ninechars",
}

// Test for correct parameters or details
describe("POST /changePassword", () => {
    test("Correct Parameters / Successful password change", async () => {
        const response = await request(app).post("/changePassword").send(pass_change_details)
        console.log(response.body)
        expect(response.body.success).toBe(true)
        expect(response.body.msg).toBe("Successfully update password")
    })
})

// Test to check if it handles error of old and current password not matching
describe("POST /changePassword", () => {
    test("Old password input does not match the current password", async () => {
        const response = await request(app).post("/changePassword").send(pass_change_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe("Wrong old password input")
    })
})

// Test to check if missing fields are handled.
describe("POST /changePassword", () => {
    test("Field with missing information", async () => {
        pass_change_details.old_password = ""
        const response = await request(app).post("/changePassword").send(pass_change_details)
        console.log(response.body)
        expect(response.body.success).toBe(false)
    })
})

afterAll(() => {
    mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close())
})