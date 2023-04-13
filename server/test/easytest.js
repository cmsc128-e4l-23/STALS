import bcrypt from "bcrypt";
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

const url = "http://localhost:" + (process.env.port) + "/";

// PRACTICALLY VARIOUS TESTS WHETHER THE FUNCTIONALITIES WORK OR NOT
/*
Checks if an already existing user could enter
*/

/*
Checks if 
*/

export default {
    clearDatabase, populateDatabase,
}
