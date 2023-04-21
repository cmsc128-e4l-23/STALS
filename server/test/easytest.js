import bcrypt from "bcrypt";
import needle from "needle";
import Accommodation from "../models/Accommodation.js"
import User from "../models/User.js";
import testdata from "./testdata.js";

// import dotenv from 'dotenv';
// dotenv.config({ path: '../' })

//FOR EASIER TESTING
//NOTE: THIS ONLY CONTAINS THE FUNCTIONS, CALL THEM IN SOME OTHER FILE
//SUCH AS check.js
//THE APPROPRIATE NAME OF THE DATABASE WOULD BE "stals".
//IN IT ARE COLLECTIONS SUCH AS "users", "accommodation", etc.
//ONLY WORKS FOR "users" and "accommodation" so far

/*
Clears the contents of the database
*/
const clearDatabase = async() => {
    await Accommodation.deleteMany({})
        .catch((error) => {
            console.log("Accommodation collection deletion error\n", err);
        });
    await User.deleteMany({})
        .catch((error) => {
            console.log("User collection deletion error\n", err);
        });
    console.log("Database Cleared!")
}

/*
Populates the database
*/
const populateDatabase = async() => {
    
    Accommodation.insertMany(testdata.accommodations)
        .catch((err) => {
            console.log("Accommodations insertion error\n" + err);
        });
    
    //Encrypting the password
    for (let user of testdata.users) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(user.password, salt);
        user.password = passwordHash;
        await User.create(user)
        .catch((err) => {
            console.log("Users insertion error\n" + err);
        });
    }
    console.log("Database Populated!");
}

/////////////////////////// NEEDLE FUNCTIONS ///////////////////////////

const url = "http://localhost:3001/"; // IDRK HOW TO SET THIS

// PRACTICALLY VARIOUS TESTS WHETHER THE FUNCTIONALITIES WORK OR NOT

// AUTH FUNCTIONS

const registerTest = async (data) => {
    needle.post(url + "register", data,
    (err, res, body) =>{
        if (err) console.error(err);
        else console.log("Registered successfully!");
    }
);
}

const loginTest = async (data) => {
    needle.post(url + "login", data,
    (err, res, body) =>{
        if (err) console.error(err);
        else if (body.success === false) console.log("Login unsuccessful");
        else console.log("Login successfully!");
    }
);
}

const loginCheckTest = async (data) => {
    needle.post(url + "checkifloggedin", data,
    (err, res, body) =>{
        if (err) console.error(err);
        else if (body.isLoggedin === false) console.log("Is not logged in");
        else console.log("Is still login!");
    }
);
}

// ACCOMMODATION FUNCTIONS
const archiveAccommTest = async (data) => {
    needle.post(url + "archiveAccomm", data,
    (err, res, body) =>{
        if (err) console.error(err);
        else if (body.success === false) console.log(body.error);
        else console.log("Archiving Successful!");
    }
);
}

const unarchiveAccommTest = async (data) => {
    needle.post(url + "unarchiveAccomm", data,
    (err, res, body) =>{
        if (err) console.error(err);
        else if (body.success === false) console.log(body.error);
        else console.log("Unarchiving Successful!");
    }
);
}

const searchAccommTest = async (data) => {
    needle.post(url + "searchAccomm", data,
    (err, res, body) =>{
        if (err) console.error(err);
        else if (body.success === false) console.log(body.error);
        else console.log("Search Successful!\n" + body.result);
    }
);
}

// YOU MAY ADD ADDITIONAL FUNCTIONS HERE SO THAT TESTING WOULD
// LOOK CLEANER

export default {
    clearDatabase, populateDatabase,
    registerTest, loginTest, loginCheckTest,
    archiveAccommTest, unarchiveAccommTest, searchAccommTest
}
