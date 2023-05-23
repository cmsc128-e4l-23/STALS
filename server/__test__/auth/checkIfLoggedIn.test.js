import app from '../../app';
import makeDB from '../../mongoose';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

beforeAll(() => makeDB('mongodb://0.0.0.0:27017/STALS_TEST'))

// Set up for check if logged in test starts here
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
  test("Correct Parameters / Successful sign up", async () => {
    const response = await request(app).post("/signup").send(signup_details)
    console.log(response.body)
    expect(response.body.success).toBe(true)
    expect(response.body.msg).toBe("User created successfully")
  })
})

var login_details = {
  email: "ngarcia@up.edu.ph",
  password: "garcia2020_02948",
}

let authToken; // Store the authentication token for later use

describe("POST /login", () => {
  test("Correct Parameters / Successful log in", async () => {
    const response = await request(app).post("/login").send(login_details)
    console.log(response.body)
    expect(response.body.success).toBe(true)
    authToken = response.body.token; // Store the authentication token
  })
})
// Setup for check if logged in ends here

describe("POST /checkIfLoggedIn", () => {
  test("User is logged in", async () => {
    const response = await request(app)
      .post("/checkIfLoggedIn")
      .set("Cookie", `authToken=${authToken}`) // Set the authentication token in the request header
    console.log(response.body)
    expect(response.body.isLoggedIn).toBe(true)
    expect(response.body.msg).toBe("User is logged in")
  })

  test("No cookies found", async () => {
    const response = await request(app).post("/checkIfLoggedIn")
    console.log(response.body)
    expect(response.body.isLoggedIn).toBeFalsy()
    expect(response.body.error).toBe("No cookies found")
  })

  test("User not found", async () => {
    const { Types } = mongoose; // Import the Types object from mongoose
    // Create a fake token with an invalid user ID (valid ObjectId format)
    const fakeToken = jwt.sign({ _id: new Types.ObjectId() }, process.env.SECRET);

    const response = await request(app)
      .post("/checkIfLoggedIn")
      .set("Cookie", `authToken=${fakeToken}`) // Set the fake token in the request header
    console.log(response.body)
    expect(response.body.isLoggedIn).toBe(false)
    expect(response.body.error).toBe("No user found")
  })

  test("Error verifying token", async () => {
    // Create an invalid token (tampered or expired)
    const invalidToken = "invalidToken"

    const response = await request(app)
      .post("/checkIfLoggedIn")
      .set("Cookie", `authToken=${invalidToken}`) // Set the invalid token in the request header
    console.log(response.body)
    expect(response.body.isLoggedIn).toBe(false)
    expect(response.body.error).toBeDefined() // Error should be defined
  })
})


afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});
