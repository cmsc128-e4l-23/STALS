import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";

const getOwnerAccomms = (req, res) => {
    let user_details = req.body;

    User.findOne({ email: user_details.email })
    .then((document) => {
        if(!document){
            throw "User not found"
        }
        Accommodation.find({owner: document._id})
        .then((documents) => {
            res.send({
                success: true, 
                message: "Accommodations successfully retrieved", 
                accommodations: documents 
            })
        })
    })
    .catch((err) => {
        res.send({
                success: false, 
                message: "Failed to retrieve accommodations", 
                error: err
        })
    })
}

const getUserBasicDetails = (req, res) => {
    let user_details = req.body;

    User.findOne({ email: user_details.email })
    .then((document) => {
        if(!document) throw "User not found"

        res.send({
            success: true,
            message: "Reviews successfully retrieved",
            user: {
                userType: document.userType,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                phoneNumber: document.phoneNumber,
                birthday: document.birthday,
                sex: document.sex,
            }
        })
    })
    .catch((err) => {
        res.send({
            success: false,
            message: "Failed to retrieve reviews",
            error: err
        })
    })
}

const getUserReviews = (req, res) => {
    let user_details = req.body;

    User.findOne({ email: user_details.email })
    .then((document) => {
        if(!document) throw "User not found"

        res.send({
            success: true,
            message: "Reviews successfully retrieved",
            reviews: document.reviews
        })
    })
    .catch((err) => {
        res.send({
            success: false,
            message: "Failed to retrieve reviews",
            error: err
        })
    })
}

const getUserReports = (req, res) => {
    let user_details = req.body;

    User.findOne({ email: user_details.email })
    .then((document) => {
        if(!document) throw "User not found"

        res.send({
            success: true,
            message: "Reports successfully retrieved",
            reports: document.reports
        })
    })
    .catch((err) => {
        res.send({
            success: false,
            message: "Failed to retrieve reports",
            error: err
        })
    })
}

const getUserBookmarks = (req, res) => {
    let user_details = req.body;

    User.findOne({ email: user_details.email })
    .then((document) => {
        if(!document) throw "User not found"

        res.send({
            success: true,
            message: "Bookmarks successfully retrieved",
            bookmarks: document.bookmarks
        })
    })
    .catch((err) => {
        res.send({
            success: false,
            message: "Book to retrieve bookmarks",
            error: err
        })
    })
}

export default {
    getOwnerAccomms,
    getUserBasicDetails,
    getUserReviews,
    getUserReports,
    getUserBookmarks
}