import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs"

import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Report from "../models/Report.js";
import Review from "../models/Review.js";

const addAccomm = (req, res) => {
        //Getting the input
    let accomm_details = req.body;
    console.log(accomm_details)

    User.findOne({ email: accomm_details.owner })
        .then( async (document) => {
            if(!document){
                throw "User not found!"
            }

            accomm_details.owner = document._id

            // Check if accommodation name already exists in the database
            const existingNameAccommodation = await Accommodation.findOne({ name: accomm_details.name });
            if (existingNameAccommodation) {
                return res.status(409).json({ error: "Accommodation with the same name already exists" });
            }

            // Check if accommodation address already exists in the database
            const existingAddressAccommodation = await Accommodation.findOne({ address: accomm_details.address });
            if (existingAddressAccommodation) {
                return res.status(409).json({ error: "Accommodation with the same address already exists" });
            }

            // If both are unique, save the accommodation to the database
            const newAccommodation = new Accommodation(accomm_details);
            const savedAccommodation = await newAccommodation.save();
            User.findByIdAndUpdate(
                document._id, 
                { "$push": { "owner.propertiesList": savedAccommodation._id}},
                { "new": true, "upsert": true })
                .then(
                    function (user){
                        console.log(user);
                    }
                )         
                
            res.status(201).json(savedAccommodation);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    })
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

// returns a json that indicates success and sends message
// throws an error if accommodation was not found or if accommodation edit failed
const editAccomm = async (req, res) => {

    const accomm_details = req.body;
    let updateObject = { $set: {} };


    try{
        if (accomm_details.name){
            updateObject.$set.name = accomm_details.name;
        }
        if (accomm_details.landmarks){
            updateObject.$set.landmarks = accomm_details.landmarks;
        }

        //address
        if (accomm_details.address){
            const newAccommAddr = accomm_details.address;
            let currentAccommAddr = await Accommodation.findById(accomm_details._id).select("address -_id").exec();

            if (currentAccommAddr){
                currentAccommAddr = currentAccommAddr.address;

                if (newAccommAddr.postCode){
                    currentAccommAddr.postCode = newAccommAddr.postCode;
                }
                if (newAccommAddr.street){
                    currentAccommAddr.street = newAccommAddr.street;
                }
                if (newAccommAddr.barangay){
                    currentAccommAddr.barangay = newAccommAddr.barangay;
                }
                if (newAccommAddr.city){
                    currentAccommAddr.city = newAccommAddr.city;
                }
                if (newAccommAddr.province){
                    currentAccommAddr.province = newAccommAddr.province;
                }
                if (newAccommAddr.region){
                    currentAccommAddr.region = newAccommAddr.region;
                }

                updateObject.$set.address = currentAccommAddr;
            } else {
                throw new Error("Accommodation not found when trying to update address");
            }
        }

        if (accomm_details.generalLocation){
            updateObject.$set.generalLocation = accomm_details.generalLocation;
        }
        if (accomm_details.accommodationType){
            updateObject.$set.accommodationType = accomm_details.accommodationType;
        }
        if (accomm_details.amenities){
            updateObject.$set.amenities = accomm_details.amenities;
        }

        //price range
        if (accomm_details.priceRange){
            const newAccommPrice = accomm_details.priceRange;
            let currentAccommPrice = await Accommodation.findById(accomm_details._id).select("priceRange -_id").exec();

            if(currentAccommPrice){
                currentAccommPrice = currentAccommPrice.priceRange;

                if (newAccommPrice.minPrice){
                    currentAccommPrice.minPrice = newAccommPrice.minPrice;
                }
                if (newAccommPrice.maxPrice){
                    currentAccommPrice.maxPrice = newAccommPrice.maxPrice;
                }

            } else {
                throw new Error("Accomodation not found when trying to update price range");
            }

            updateObject.$set.priceRange = currentAccommPrice;
        }

        if (accomm_details.description){
            updateObject.$set.description = accomm_details.description;
        }
        if (accomm_details.photos){
            updateObject.$set.photos = accomm_details.photos;
        }
        if (accomm_details.restrictions){
            updateObject.$set.restrictions = accomm_details.restrictions;
        }
        if (accomm_details.security){
            updateObject.$set.security = accomm_details.security;
        }
        
        //Updating the accommodation
        const result = await Accommodation.findByIdAndUpdate(
            { _id: accomm_details._id },
            updateObject
        );

        if (result) {
            res.send({ success: true, message: "Successfully edited accommodation" });
        } else {
            throw new Error("Accommodation not found");
        }
    } catch (error) {
        console.log(error);
        res.send({ success: false, message: "Failed to edit accommodation", error: error });
    }

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
            res.send({ success: true, message: "Successfully deleted accommodation" });
        })
        .catch((err) => {
            console.log(err);
            res.send({ success: false, error: "Deletion Failed" });
        })
}

/*
Search Functionality
req.body is an object that should have:
    - a key named "searchString" that contains a string to be searched in the database
    - it assumes that search string is empty

A successful search will result to a res.body that contains
    - a key "success" with a value true
    - a key "msg" indicating that the operation is successful
    - a key result with an array of the documents being searched by the user

A unsuccessful search will result to a res.body that contains
    - a key "success" with a value false
    - a key "msg" with a value indicating a failed search
*/
const searchAccomm = async (req, res) => {
    // searching is not case-sensitive
    const searchString = { "$regex": req.body.searchString, "$options": "i" };
    Accommodation.find({ $or: [
        { name: searchString },
        { "address.postCode": searchString },
        { "address.street": searchString },
        { "address.barangay": searchString },
        { "address.city": searchString },
        { "address.province": searchString },
        { "address.region": searchString }] })
        .then((result) => {
            res.send({ success: true, msg: "Search Accommodation Successful", result: result });
        })
        .catch((error) => {
            console.log(error);
            res.send({ success: false, msg: "Search Accommodation Failed" });
        })
}

/*
Search Recommendation
req.body is an object that should have:
    - a key named "searchString" that contains a string to be searched in the database
    - a key named "accommLength" which would be the number of accommodations
        to be sampled from the database
    - a key named "returnLength" which would be the number of accommodations to be returned 

A successful search will result to a res.body that contains
    - a key "success" with a value true
    - a key "msg" indicating that the operation is successful
    - a key "result" with an array of objects with at least one rating
        * The objects contain the following:
            - a key "accommodation" which contains the accommodation object
            - a key "rating" which contains the rating
            - a key "ratingNum" which contains the number of ratings

A unsuccessful search will result to a res.body that contains
    - a key "success" with a value false
    - a key "msg" with a value indicating a failed search
*/
const recommendAccomm = async (req, res) => {
    const searchString = req.body.searchString;
    const returnLength = parseInt(req.body.returnLength);
    const accommLength = parseInt(req.body.accommLength);
    try {
        if (!returnLength && returnLength <= 0) throw new Error("Return Length must be a postiive integer");
        if (!accommLength && accommLength <= 0) throw new Error("Accomm Length must be a positive integer");
        if (returnLength > accommLength) throw new Error("Return Length must be less than or equal to Accomm Length")

        // search randomly unarchived accomms w/ at least one review
        const randsearch = await Accommodation.aggregate(
            [{$match: {archived: false, reviews: {$ne: []}}},
            {$sample: {size: accommLength}} ]
        )
        // from those searches arrange those by the ratings
        let sortlist = [];
        for (let accomm of randsearch) {
            let sum = 0;
            let reviews = accomm.reviews;
            let reviewnum = reviews.length;
            for (let rev of reviews) {
                let actualrev = await Review.findById(rev._id);
                sum += actualrev.rating;
            }
            // calculate the total rating
            let rating = (sum/reviewnum).toFixed(2);
            sortlist.push({accommodation: accomm, rating: rating, ratingNum: reviewnum});
        }
        // then order the sorted list by rating
        sortlist.sort((a, b)=>{return b.rating - a.rating})
        // get only the return length
        if (returnLength <= sortlist.length) sortlist = sortlist.slice(0, returnLength);

        res.send({success: true, msg: "Search Recommendation Successful", result: sortlist})

    } catch (error) {
        res.send({success: false, msg: "Search Recommendation Failed"});
        console.error(error);
    }
}

/*
Bookmark Functionality
req.body is an object that should have:
    - user_id which is the id of the user
    - accomm_id which is the id of the accommodation

A successful bookmark will result to a res.body that contains
    - a key "success" with a value true
    - a key "msg" indicating that the operation is successful

A unsuccessful bookmark will result to a res.body that contains
    - a key "success" with a value false
    - a key "msg" with a value indicating a failed operation
*/
const bookmarkAccomm = async (req, res) => {
    try {
        const bookmark_details = req.body;

        // accomm_id is added to bookmarks array
        User.updateOne(
            { _id: bookmark_details.user_id },
            { $addToSet: { bookmarks: bookmark_details.accomm_id } }
        ).then((result) => {
            res.send({ success: true, msg: "Bookmark Success" });
        })
        .catch((error) => {
            console.log(error);
            res.send({ success: false, msg: "Bookmark Failed" });
        });
    } catch (err) {
        res.send({ success: false, msg: err.message });
        console.error(err);
    }
}

/*
Remove Bookmark Functionality
req.body is an object that should have:
    - user_id which is the id of the user
    - accomm_id which is the id of the accommodation

A successful bookmark will result to a res.body that contains
    - a key "success" with a value true
    - a key "msg" indicating that the operation is successful

A unsuccessful bookmark will result to a res.body that contains
    - a key "success" with a value false
    - a key "msg" with a value indicating a failed operation
*/
const removeBookmarkAccomm = async (req, res) => {
    try {
        const bookmark_details = req.body;

        //accomm_id is removed from bookmark array
        User.updateOne(
            { _id: bookmark_details.user_id },
            { $pull: { bookmarks: bookmark_details.accomm_id } }
        ).then((result) => {
            res.send({ success: true, msg: "Remove Bookmark Success" });
        })
        .catch((error) => {
            console.log(error);
            res.send({ success: false, msg: "Remove Bookmark Failed" });
        });
    } catch (err) {
        res.send({ success: false, msg: err.message });
        console.error(err);
    }
}

//Function for fetching bookmarks
const fetchBookmarks = async (userID) => {
    return User.findOne({ _id: userID })
        .then((user) => {
            return Accommodation.find({ _id: { $in: user.bookmarks } })
                .then((result) => {
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
    try {
        const bookmarks = await fetchBookmarks(req.body._id);                           // Retrieve bookmarks given user id

        const doc = new PDFDocument();                                                  // Create pdf document
        const fileName = `report-${new Date().getTime()}.pdf`;                          // Set filename and path. Only for testing with needle
        const filePath = path.join("./test/Download", fileName);
        doc.pipe(fs.createWriteStream(filePath));


        // doc.pipe(res)       // Use instead if implemented on web browser already

        // Edit the PDF file
        doc.fontSize(20).text('Bookmarked Accommodations', { underline: true });
        doc.moveDown();
        bookmarks.forEach((accommodation, index) => {
            doc.fontSize(16).text(`#${index + 1}: ${accommodation.name}`);
            doc.moveDown();
            if (accommodation.landmarks) {
                doc.font("./font/Helvetica-Bold.ttf").fontSize(12).text(`Landmarks:`);
                doc.font("./font/Helvetica.ttf").fontSize(12).list(accommodation.landmarks);
                doc.moveDown();
            }

            doc.font("./font/Helvetica-Bold.ttf").fontSize(12).text(`Address: `)
            doc.font("./font/Helvetica.ttf").text(`\u0020 ${accommodation.address.street}, ${accommodation.address.barangay}, ${accommodation.address.city}, ${accommodation.address.province}, ${accommodation.address.region}, ${accommodation.address.postCode}`);
            doc.moveDown();

            doc.font("./font/Helvetica-Bold.ttf").fontSize(12).text(`Accommodation Type: `)
            doc.font("./font/Helvetica.ttf").text(`\u0020 ${accommodation.accommodationType}`);
            doc.moveDown();

            if (accommodation.amenities) {
                doc.font("./font/Helvetica-Bold.ttf").fontSize(12).text(`Amenities: `)
                doc.font("./font/Helvetica.ttf").text(`\u0020 ${accommodation.amenities}`);
                doc.moveDown();
            }
            doc.font("./font/Helvetica-Bold.ttf").fontSize(12).text(`Price Range:`)
            doc.font("./font/Helvetica.ttf").text(`\u0020 P${accommodation.priceRange.minPrice} - P${accommodation.priceRange.maxPrice}`);
            doc.moveDown();

            doc.font("./font/Helvetica-Bold.ttf").fontSize(12).text(`Description:`)
            doc.font("./font/Helvetica.ttf").text(`\u0020 ${accommodation.description}`);
            doc.moveDown();

            //Further Implementation
            // if(accommodation.photos.length > 0){
            //     for(let i=0; i<accommodation.photos.length; i++){
            //         doc.image(accommodation.photos[i], 0, 15, {width: 300});
            //     }
            // }

            doc.font("./font/Helvetica-Bold.ttf").fontSize(12).text(`Restrictions:`);

            doc.font("./font/Helvetica-BoldOblique.ttf").fontSize(12).text(`   Curfew:`)
            doc.font("./font/Helvetica.ttf").text(`      ${accommodation.restrictions.curfew}`);

            doc.font("./font/Helvetica-BoldOblique.ttf").fontSize(12).text(`   Pets:`)
            doc.font("./font/Helvetica.ttf").text(`      ${accommodation.restrictions.pets}`);

            doc.font("./font/Helvetica-BoldOblique.ttf").fontSize(12).text(`   Cooking:`)
            doc.font("./font/Helvetica.ttf").text(`      ${accommodation.restrictions.cooking}`);

            doc.font("./font/Helvetica-BoldOblique.ttf").fontSize(12).text(`   Visitors:`)
            doc.font("./font/Helvetica.ttf").text(`      ${accommodation.restrictions.visitors}`);

            doc.font("./font/Helvetica-BoldOblique.ttf").fontSize(12).text(`   Co-ed:`)
            doc.font("./font/Helvetica.ttf").text(`      ${accommodation.restrictions.coedStatus}`);

            doc.font("./font/Helvetica-BoldOblique.ttf").fontSize(12).text(`   Wifi:`)
            doc.font("./font/Helvetica.ttf").text(`      ${accommodation.restrictions.wifi}`);

            if (accommodation.restrictions.phoneSignal) {
                // doc.fontSize(12).text(`   Phone Signal: ${accommodation.restrictions.phoneSignal}`);
                doc.font("./font/Helvetica-BoldOblique.ttf").fontSize(12).text(`   Phone Signal:`)
                doc.font("./font/Helvetica.ttf").text(`      ${accommodation.restrictions.phoneSignal}`);
            }

            doc.moveDown();
            if (accommodation.security) {
                doc.font("./font/Helvetica-Bold.ttf").fontSize(12).text(`Security:`)
                doc.font("./font/Helvetica.ttf").text(`\u0020 ${accommodation.security}`);
                doc.moveDown();

            }
            doc.moveDown();
        });

        // "Close" the PDF file and send it to where `pipe` specifies it to go
        doc.end();

        console.log(`PDF report saved to ${filePath}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error generating report');
    }
};

//for testing
const viewAccomm = async (req, res) => {
    Accommodation.findById("643665dccee7fa1d7dd408ea")
        .then((result) => {
            res.send({ result: result });
        })
        .catch((error) => {
            console.log(error);
        });
}

/*
The req.body should simply contain what's in the report schema
You may refer to test.js to check how it is used
*/
const reportAccomm = async (req, res) => {
    try {
        const report_details = req.body;
        const custom_id = new mongoose.Types.ObjectId();

        const report = new Report({
            _id: custom_id,
            user: report_details.user_id,
            reported: report_details.reported_id,
            classification: report_details.classification,
            content: report_details.content,
            status: "Pending"
        });
        await report.save();
        // also add that report to the user

        User.updateOne(
            { _id: report_details.user_id },
            { $push: { reports: custom_id } }
        ).then((result) => {
            res.send("Successfully appended report to user");
        })
            .catch((error) => {
                console.log(error);
                res.send({ success: false, error: "Report Appending Failed" });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
        console.error(err);
    }
    //res.send("I am reporting an accommodation");
}

export default {
    addAccomm,
    archiveAccomm,
    unarchiveAccomm,
    editAccomm,
    deleteAccomm,
    searchAccomm,
    recommendAccomm,
    generateRep,
    viewAccomm,
    bookmarkAccomm,
    removeBookmarkAccomm,
    reportAccomm
}