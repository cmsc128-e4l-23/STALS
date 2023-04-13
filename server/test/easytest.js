import needle from "needle";
import mongoose from "mongoose";
import Accommodation from "../models/Accommodation.js"
import User from "../models/User.js";
import testdata from "./testdata.js";

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
    User.insertMany(testdata.users)
        .catch((err) => {
            console.log("Users insertion error\n" + err);
        });
    console.log("Database Populated!");
}

export default {
    clearDatabase, populateDatabase,

}
