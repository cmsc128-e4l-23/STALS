import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// Function for sign up
export const signUp = async (req, res) => {
    try {
        // Getting the input
        let user_details = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^09\d{9}$/;
        //const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; no need since HTML has date input


        // Validating the email format given the regex
        if (!emailRegex.test(user_details.email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email: user_details.email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" });
        }
        
        // Validating the password. Must contain 8 or more characters.
        if (user_details.password.length < 8) {
            return res.status(400).json({ error: "Password should be at least 8 characters long" });
        }

        // Validating the phone number format. Must start with 09 and then 9 more digits.
        if (!phoneRegex.test(user_details.phoneNumber)) {
            return res.status(400).json({ error: "Invalid phone number" });
        }   

        // Validating if phone number already exists
        const existingPhoneNum = await User.findOne({ phoneNumber: user_details.phoneNumber });
        if (existingPhoneNum) {
            return res.status(409).json({ error: "Phone number already exists" });
        }        

        // Validating the birthday format and checking if birthday is not in the future. Works if the format of user_details.birthday string is MM/DD/YYYY.
        const birthday = new Date(user_details.birthday);
        const now = new Date();
        if (isNaN(birthday.getTime()) || birthday > now) {
            return res.status(400).json({ error: "Invalid birthday" });
        }

        // Encrypting the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(user_details.password, salt);

        user_details = {...user_details, password: passwordHash}
        //Completing the user details along with the encrypted password
        const newUser = new User(user_details);
        
        //saves the user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Function for log in
//returns a success value of true if the user successfully logged in 
//else, the success value is false
const logIn = async (req, res) => {
    
    //gets the email and password
    const email = req.body.email.trim();
    const password = req.body.password;

    //finds the email in the database
    User.findOne({email: email})
        .then((document) => {
            
            //checks the password if correct
            bcrypt.compare(password, document.password, function(err, result){
                if(err || !result){
                    return res.send({ success: result, error: "Incorrect Password" });    
                }
                
                //issues the token and cookies
                const tokenPayLoad = {
                    _id: document._id
                }
                
                //NOTE: do not name this var "token"
                const token = jwt.sign(tokenPayLoad, process.env.SECRET);
                
                
                //NOTE: you must send the token for authentication to work
                return res.send({ success: result, token, fname: document.firstName, lname: document.lastName, email: document.email, type: document.userType });
            });
        })
        .catch((error) => res.send({ success: false, error: "User not found"}))

}

//function for checking if a user is logged in
//Returns an isLoggedIn value of true, when a user is logged in
//else, returns an isLoggedIn value of false
const checkIfLoggedIn = async (req, res) => {
    //check if there are cookies
    if(!req.cookies || !req.cookies.authToken){
        return res.send({ isLoggedin: false, error: "no cookies found"  });
    }
    
    //verifies the cookies
    return jwt.verify(
    req.cookies.authToken,
    process.env.SECRET,
    (err, tokenPayload) => {
        if(err) {
            console.log(req.cookies);
            return res.send({ isLoggedIn: false, error: err });
        }

        const userId = tokenPayload._id;

        // check if user exists
        return User.findOne({_id: userId},
            ).then(
                (document) =>{
                    if(!document){
                        return res.send({isLoggedIn: false, error: "no user found"});
                    }
                    
                    return res.send({ isLoggedIn: true });
                }
            )
            .catch((error) => res.status(400).json({error})); 
    });
}

//Function for retrieving the encrypted password of a user based on the email input
const retrievePasswordHash = async (user_email) =>{
    return User.findOne({email: user_email})
        .then((user)=>{
            return user.password;
        })
        .catch((error) => {
            return false; 
        });
}


//JS POST method for changing the password of a user
//The request body should follow the following format:
/*
{
    user_email: <string of the user email>,
    old_password: <string of the old password of the user>,
    new_password: <string of the new password of the user to be changed>
}
*/
const changePassword = async (req, res) => {
    
    //retrieves the encrypted old password
    let passwordHash = await retrievePasswordHash(req.body.user_email);
    
    //checks if the old password inputted matches the encrypted old password
    bcrypt.compare(req.body.old_password, passwordHash, async function(err, result){
        if(!result){
            res.send({success:false, error: "Wrong old password input"})
        } else{

            //encrypts the new password
            const salt = await bcrypt.genSalt();
            const newPasswordHash = await bcrypt.hash(req.body.new_password, salt);

            //updates the encrypted password in the database
            User.updateOne({email: req.body.user_email}, {$set: {password: newPasswordHash}})
                .then((result)=>{
                    res.send({success:true, msg: "Successfully update password"})
                })
                .catch((error)=>{
                    res.send({success:false, error: error})
                })    
        }
    });
}

export default {
    signUp,
    logIn,
    checkIfLoggedIn,
    changePassword
};