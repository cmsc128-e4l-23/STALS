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
    const email = req.body.email.trim();
    const password = req.body.password;

    User.find({email: email})
        .then((results) => {
            bcrypt.compare(password, results[0].password, function(err, result){
                const tokenPayLoad = {
                    _id: results[0]._id
                }
                const token = jwt.sign(tokenPayLoad, "THIS_IS_A_SECRET_STRING");
                return res.send({ success: result, token: token, email: results[0].email });

            });
        })
        .catch((error) => res.status(400).json({error}))

}

const checkIfLoggedIn = async (req, res) => {
    
    if(!req.cookies || !req.cookies.authToken){
        //Scenario 1: FAIL - No cookies / no authToken cookies sent
        console.log(req)
        return res.send({ isLoggedin: false, check: "adfasdf"  });
    }
    
    return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
        if(err) {
            //Scenario 2: FAIL - Error validating token
            console.log(err)
            return res.send({ isLoggedIn: false, check: false });
        }

        const userId = tokenPayload._id;

        // check if user exists
        return User.find({_id: userId},
            ).then(
                (results) =>{
                    if(!results[0]){
                        return res.send({ isLoggedIn: false});
                    }

                    //Scenario 4: SUCCESS - token and user id are valid 
                    console.log("user is currently logged in");
                    return res.send({ isLoggedIn: true });
                }
            )
            .catch((error) => res.status(400).json({error})); 

    });
}

export default {
    register,
    logIn,
    checkIfLoggedIn
};