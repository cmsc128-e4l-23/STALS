import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register */
export const register = async (req, res) => {
    try{
        const{
            userType,
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            userType,
            firstName,
            lastName,
            email,
            password : passwordHash,
            phoneNumber,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch (err){
        res.status(500).json({ error: err.message });
    }
}

const logIn = async (req, res) => {
    res.send("I am logging in");
}

const checkIfLoggedIn = async (req, res) => {
    res.send("I am checking if I am logged in");
}

export default {
    register,
    logIn,
    checkIfLoggedIn
};