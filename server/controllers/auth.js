import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Function for sign up
export const signUp = async (req, res) => {
    try{
        //Getting the input
        let user_details = req.body;

        //Encrypting the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(user_details.password, salt);

        //Completing the user details along with the encrypted password
        const newUser = new User({
            userType : user_details.userType,
            firstName : user_details.firstName,
            lastName: user_details.lastName,
            email: user_details.email,
            password : passwordHash,
            phoneNumber : user_details.phoneNumber,
            sex: user_details.sex,
            birthday: user_details.birthday
        });
        
        //saves the user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch (err){
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
    User.find({email: email})
        .then((results) => {
            
            //checks the password if correct
            bcrypt.compare(password, results[0].password, function(err, result){
                if(!result){
                    return res.send({ success: result, error: "incorrect password" });    
                }
                
                //issues the token and cookies
                const tokenPayLoad = {
                    _id: results[0]._id
                }
                
                //NOTE: do not name this var "token"
                const token1 = jwt.sign(tokenPayLoad, "THIS_IS_A_SECRET_STRING");
                
                
                //NOTE: you must send the token for authentication to work
                return res.send({ success: result, token: token1 });
            });
        })
        .catch((error) => res.send({ success: false, error: "email not found"}))

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
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
        if(err) {
            console.log(req.cookies);
            return res.send({ isLoggedIn: false, error: err });
        }

        const userId = tokenPayload._id;

        // check if user exists
        return User.find({_id: userId},
            ).then(
                (results) =>{
                    if(!results[0]){
                        return res.send({isLoggedIn: false, error: "no user found"});
                    }
                    console.log("user is currently logged in");
                    return res.send({ isLoggedIn: true });
                }
            )
            .catch((error) => res.status(400).json({error})); 
    });
}

export default {
    signUp,
    logIn,
    checkIfLoggedIn
};