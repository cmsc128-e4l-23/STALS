import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";

const getOwnerAccomms = (req, res) => {
    let user_details = req.body;

    User.findOne({ email: user_details.email }).then((document) => {
        if(!document){
            throw "User not found"
        }
        Accommodation.find({owner: document._id}).then((documents) => {
            console.log(documents);
            res.status(201).json({ accommodations: documents })
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({err: err})
    })
}

export default {
    getOwnerAccomms
}