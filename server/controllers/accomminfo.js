import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";

const getAccommOwner = (req, res) => {
    let accomm_details = req.body;

    Accommodation.findOne({ _id: accomm_details._id })
    .then((document) => {
        if(!document) throw "Accommodation not found"

        User.findOne({ _id: document.owner })
        .then((user) => {
            if(!user) throw "Owner not found"

            res.send({
                success: true, 
                message: "Accommodation owner successfully retrieved", 
                owner: {
                    email: user.email,
                    name: user.firstName + " " + user.lastName,
                    contact: user.phoneNumber
                }
            })
        })
        
    })
    .catch((err) => {
        res.send({
                success: false, 
                message: "Failed to retrieve accommodation owner", 
                error: err
        })
    })
}

const getAccommBasicDetails = (req, res) => {
    let accomm_details = req.body;

    Accommodation.findOne({ _id: accomm_details._id })
    .then((document) => {
        if(!document) throw "Accommodation not found"

        res.send({
            success: true,
            message: "Accommodation basic details successfully retrieved",
            accommodation: {
                name: document.name,
                address: document.address,
                generalLocation: document.generalLocation,
                accommodationType: document.accommodationType,
                priceRange: document.priceRange,
                photos: document.photos,
            }
        })
    })
    .catch((err) => {
        res.send({
            success: false,
            message: "Failed to retrieve basic details",
            error: err
        })
    })
}

const getAccommFullDetails = (req, res) => {
    let accomm_details = req.body;

    Accommodation.findOne({ _id: accomm_details._id })
    .then((document) => {
        if(!document) throw "Accommodation not found"

        res.send({
            success: true,
            message: "Accommodation full details successfully retrieved",
            accommodation: document
        })
    })
    .catch((err) => {
        res.send({
            success: false,
            message: "Failed to retrieve full details",
            error: err
        })
    })
}

const getAccommReviews = (req, res) => {
    let accomm_details = req.body;

    Accommodation.findOne({ _id: accomm_details._id })
    .then((document) => {
        if(!document) throw "Accommodation not found"

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

const getAccommReports = (req, res) => {
    let accomm_details = req.body;

    Accommodation.findOne({ _id: accomm_details._id })
    .then((document) => {
        if(!document) throw "Accommodation not found"

        //TODO:proper implementation of report
        throw "Service not yet implemented"
    })
    .catch((err) => {
        res.send({
            success: false,
            message: "Failed to retrieve reviews",
            error: err
        })
    })
}

const checkIfBookmarked = (req, res) => {
    let req_details = req.body;

    User.findOne({email: req_details.user})
    .then((document) => {
        if(document) res.send({ success: true, bookmarked: document.bookmarks.includes(req_details.accomm) })
        else throw Error
    })
    .catch((err) => {
        res.send({ success: false, msg: "Could not check if bookmarked" })
    })
}

export default {
    getAccommOwner,
    getAccommBasicDetails,
    getAccommFullDetails,
    getAccommReviews,
    getAccommReports,
    checkIfBookmarked
}