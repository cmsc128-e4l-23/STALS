import Accommodation from "../models/Accommodation.js";
import User from "../models/User.js";

const addAccomm = async (req, res) => {
    try{
        //Getting the input
        let accomm_details = req.body;

        //Completing accommodation details given the input
        const newAccommodation = new Accommodation({
            accommodationID: accomm_details.accommodationID,
            name: accomm_details.name,
            landmarks: accomm_details.landmarks,
            address: {
                postCode: accomm_details.address.postCode,
                street: accomm_details.address.street,
                barangay: accomm_details.address.barangay,
                city: accomm_details.address.city,
                province: accomm_details.address.province,
                region: accomm_details.address.region
            },
            generalLocation: accomm_details.generalLocation,
            accommodationType: accomm_details.accommodationType,
            amenities: accomm_details.amenities,
            priceRange: {
                minPrice: accomm_details.priceRange.minPrice,
                maxPrice: accomm_details.priceRange.maxPrice
            },
            description: accomm_details.description,
            photos: accomm_details.photos,
            restrictions: {
                curfew: accomm_details.restrictions.curfew,
                pets: accomm_details.restrictions.pets,
                cooking: accomm_details.restrictions.cooking,
                visitors: accomm_details.restrictions.visitors,
                coedStatus: accomm_details.restrictions.coedStatus,
                wifi: accomm_details.restrictions.wifi,
                phoneSignal: accomm_details.restrictions.phoneSignal
            },
            security: accomm_details.security,
            archived: accomm_details.archived
        });
        
        //Saves the accommodation to the database
        const savedAccommodation = await newAccommodation.save();
        res.status(201).json(savedAccommodation);
    }catch (err){
        res.status(500).json({ error: err.message });
    }
}

const archiveAccomm = async (req, res) => {

    const accomm_details = req.body;

    Accommodation.updateOne(
        { _id: accomm_details._id },
        { $set: { archived: true } }
    )
        .then((result) => {
            res.send({ success: true, message: "Successfully archived accommodation" });
        })
        .catch((error) => {
            console.log(err);

            res.send({ success: false, error: "Archive Failed" });
        })
}

const unarchiveAccomm = async (req, res) => {

    const accomm_details = req.body;

    Accommodation.updateOne(
        { _id: accomm_details._id },
        { $set: { archived: false } }
    )
        .then((result) => {
            res.send({ success: true, message: "Successfully unarchived accommodation" });
        })
        .catch((error) => {
            console.log(err);

            res.send({ success: false, error: "Unarchive Failed" });
        })
}

//Function for delete accomodation
//returns a success value of true if the accommodation is successfully deleted
//else, the success value is false
const deleteAccomm = async (req, res) => {
    const accomm_details = req.body;
    //delete the accomodation with the id
    Accommodation.deleteOne(
        { _id: accomm_details._id }
    )
        .then((result) => {
            res.send({success: true, message:"Successfully deleted accommodation"});
        })
        .catch((err) => {
            console.log(err);
            res.send({ success: false, error: "Deletion Failed" });
        })
}

//search functionality
//req.body is an object that should have:
//      - a key named "searchString" that contains a string to be searched in the database

//A successful search will result to a res.body that contains
//  - a key "success" with a value true
//  - a key result with an array of the documents being searched by the user

//A unsuccessful search will result to a res.body that contains
//  - a key "success" with a value false
//  - a key error with a value "Search Failed"
const searchAccomm = async (req, res) => {

    const searchString = { "$regex": req.body.searchString };


    Accommodation.find({ $or: [{ name: searchString }, { "address.postCode": searchString }, { "address.street": searchString }, { "address.barangay": searchString }, { "address.city": searchString }, { "address.province": searchString }, { "address.region": searchString }] })
        .then((result) => {
            res.send({ success: true, result: result });
        })
        .catch((error) => {
            console.log(err);
            res.send({ success: false, error: "Search Failed" });
        })



    // res.send("I am searching accommodation");
}


//bookmark functionality
//req.body is an object that should have:
//      - two ids, the user and the id of accommodation to be bookmarked
//if success, it will have res.body that contains
//  - a key "success" with a value true else false
//  - a key error with a value "Bookmark Success" else "Bookmark Failed"
//Note: It is assumed that the accommodation is not yet bookmarked
const bookmarkAccomm = async (req, res) => {
    try {
        const bookmark_details = req.body;

        // also add that report to the user
        User.updateOne(
            { _id: bookmark_details.user_id },
            { $push: { bookmarks: bookmark_details.accomm_id } }
        ).then((result) => {
            res.send({ success: true, message: "Bookmark Success" });
        })
            .catch((error) => {
                console.log(error);
                res.send({ success: false, error: "Bookmark Failed" });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
        console.error(err);
    }
}

//remove bookmark functionality
//req.body is an object that should have:
//      - two ids, the user and the id of accommodation to be removed in bookmarks
//if success, it will have res.body that contains
//  - a key "success" with a value true else false
//  - a key error with a value "Remove Bookmark Success" else "Remove Bookmark Failed"
//Note: It is assumed that the accommodation is in the bookmarks
const removeBookmarkAccomm = async (req, res) => {
    try {
        const bookmark_details = req.body;

        // also add that report to the user
        User.updateOne(
            { _id: bookmark_details.user_id },
            { $pull: { bookmarks: bookmark_details.accomm_id } }
        ).then((result) => {
            res.send({ success: true, message: "Remove Bookmark Success" });
        })
            .catch((error) => {
                console.log(error);
                res.send({ success: false, error: "Remove Bookmark Failed" });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
        console.error(err);
    }
}

//Function for fetching bookmarks
const fetchBookmarks = async (userID) => {
    return User.findOne({_id:userID})
        .then((user)=>{
            return Accommodation.find({_id:{$in:user.bookmarks}})
                .then((result) =>{
                    // console.log(result)
                    return result;
                })
                .catch((error) => {
                    console.log(error)
                });
        })
        .catch((error) => {
            console.log(error)
        });
}



//Functions that generates a pdf file of the bookmarked accommmodations of the user

//Input: Accepts an object containing a key named "_id" with the user ID of the user that will be used


const generateRep = async (req, res) => {
    fetchBookmarks(req.body._id)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error)
        });  
    
    res.send("I am generating report");
}




//for testing
const viewAccomm = async (req, res) => {
    Accommodation.findById('643665dccee7fa1d7dd408ea')
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log(error)
        });
}

export default {
    addAccomm,
    archiveAccomm,
    unarchiveAccomm,
    deleteAccomm,
    searchAccomm,
    generateRep,
    viewAccomm,
    bookmarkAccomm,
    removeBookmarkAccomm
}