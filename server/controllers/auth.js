import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";




/* Register */
export const register = async (req, res) => {
    try{
        const{
            firstName,
            lastName,
            email,
            password,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch (err){
        res.status(500).json({ error: err.message });
    }
}

const logIn = async (req, res) => {
    const email = req.body.email.trim();
    const password = req.body.password;

    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);


    User.find({email: email})
        .then((results) => {
            bcrypt.compare(password, results[0].password, function(err, result){
                console.log("hellow");
            });


        })
        .catch((error) => res.status(400).json({error}))

}

const checkIfLoggedIn = async (req, res) => {
    res.send("I am checking if I am logged in");
}

export default {
    register,
    logIn,
    checkIfLoggedIn
};