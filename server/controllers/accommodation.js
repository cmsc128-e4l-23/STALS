import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs"

import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Report from "../models/Report.js";
import Review from "../models/Review.js";

const addAccomm = async (req, res) => {
    //Getting the input
    let accomm_details = req.body;

    try{
        //NOTE: The accommodation model states that the 'owner' field contains an object
        // const currEmail = await User.findById(accomm_details.owner).select("email -_id").exec();
        
        const currUser = await User.findById(accomm_details.owner);

        if (currUser){
            // accomm_details.owner = currUser._id
            
            // Check if accommodation name already exists in the database
            const existingNameAccommodation = await Accommodation.findOne({ name: accomm_details.name });
            if (existingNameAccommodation) {
                // return res.status(409).json({ error: "Accommodation with the same name already exists" });
                throw new Error("Accommodation with the same name already exists");
            }
            
            // Check if accommodation address already exists in the database
            const existingAddressAccommodation = await Accommodation.findOne({ address: accomm_details.address });
            if (existingAddressAccommodation) {
                // return res.status(409).json({ error: "Accommodation with the same address already exists" });
                throw new Error("Accommodation with the same address already exists");
            }

            // If both are unique, save the accommodation to the database
            const newAccommodation = new Accommodation(accomm_details);
            const savedAccommodation = await newAccommodation.save();
            const result = await User.findByIdAndUpdate(
                currUser._id, 
                { $push: { "owner.propertiesList": savedAccommodation._id }},
                { "new": true, "upsert": true }
            );

            // const result = await User.findById(currUser._id);
            // if (result){
            //     const resultYo = await User.updateOne(
            //         { _id: currUser._id },
            //         { $push: { "owner.propertiesList": savedAccommodation._id }},
            //         { "new": true, "upsert": true }
            //     )

            //     if(!resultYo){
            //         throw new Error("User not updating");
            //     }
            // }
            // await result.save();
            
            console.log(result);
            if (!result){
                throw new Error("Error updating user in add accommodation");
            }

            res.send({ success: true, message: "Successfully added accommodation" });
        } else {
            throw new Error("User not found");
        }
    } catch(error) {
        res.send({ success: false, message: error.message });
    }
}

const archiveAccomm = async (req, res) => {

    const accomm_details = req.body;

    try{
        const result = await Accommodation.findByIdAndUpdate(
            accomm_details._id,
            { $set: { archived: true }}
        );

        if (result){
            res.send({ success: true, message: "Successfully archived accommodation" });
        } else {
            throw new Error("Failed to find and archive accommodation");
        }
    } catch (error){
        res.send({ success: false, message: error.message });
    }
}

const unarchiveAccomm = async (req, res) => {

    const accomm_details = req.body;

    try{
        const result = await Accommodation.findByIdAndUpdate(
            accomm_details._id,
            { $set: { archived: false }}
        );

        if (result){
            res.send({ success: true, message: "Successfully unarchived accommodation" });
        } else {
            throw new Error("Failed to find and unarchive accommodation");
        }
    } catch (error){
        res.send({ success: false, message: error.message });
    }
}

// returns a json that indicates success and sends message
// throws an error if accommodation was not found or if accommodation edit failed
const editAccomm = async (req, res) => {
    const accomm_details = req.body;
    
    try{
        let currAccomm = await Accommodation.findById(accomm_details._id);

        if (currAccomm){
            const currAccommObj = currAccomm.toObject();

            //creates the updateObject that determines what would be
            //updated in the document
            const updateObject = {
                $set: {...currAccommObj, ...accomm_details,
                    address: {
                        ...currAccommObj.address,
                        ...(accomm_details.address ?? {})
                    },
                    priceRange: {
                        ...currAccommObj.priceRange,
                        ...(accomm_details.priceRange ?? {})
                    }
                }
            };

            const result = await Accommodation.findByIdAndUpdate(
                {_id: accomm_details._id},
                updateObject
            );

            if (result){
                res.send({ success: true, message: "Successfully edited accommodation" })
            } else {
                throw new Error("An error occured in updating the accommodation");
            }

        } else {
            throw new Error("Accommodation not found.");
        }
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
}

//Function for delete accomodation
//returns a success value of true if the accommodation is successfully deleted
//else, the success value is false
const deleteAccomm = async (req, res) => {
    const accomm_details = req.body;
    //delete the accomodation with the id

    try{
        const currAccomm = await Accommodation.findByIdAndDelete(accomm_details._id);

        if (currAccomm){
            const currUser = await User.findByIdAndUpdate(
                currAccomm.owner,
                { $pull: { "owner.propertiesList" : accomm_details._id }}
            );

            if (currUser){
                res.send({ success: true, message: "Successfully deleted accommodation" })
            } else {
                throw new Error("Failed to find and edit propertyList of current user");
            }
        } else {
            throw new Error("Failed to find and delete accommodation");
        }
    } catch (err){
        res.send({ success: false, message: err.message });
    }

    // Accommodation.findByIdAndDelete(accomm_details._id)
    // .then((res) => {
    //     User.findByIdAndUpdate(
    //             accomm_details.owner, 
    //             { "$pull": { "owner.propertiesList": accomm_details._id}})
    //             .then(
    //                 res.send({success: true, message: "Successfully deleted accommodation"})
    //             )
    // }).catch((err) => {
    //     console.log("accommodation not found.");
    //     res.send({success: false, message: err.message});
    // })
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

    const searchString = { "$regex": req.body.searchString, "$options": "i" };


    Accommodation.find({ $or: [{ name: searchString }, { "address.postCode": searchString }, { "address.street": searchString }, { "address.barangay": searchString }, { "address.city": searchString }, { "address.province": searchString }, { "address.region": searchString }] })
        .then((result) => {
            res.send({ success: true, result: result });
        })
        .catch((err) => {
            console.log(err);
            res.send({ success: false, error: "Search Failed" });
        })



    // res.send("I am searching accommodation");
}

/*
Search Recommendation based on overall ratings
and how much would be returned
via req.body.returnLength for each category.
Realistically, due to the number of accommodations present,
its number should be limited by req.body.accommLength
The response is ordered by the ratings
and all of the accommodations are unarchived.

*/
const recommendAccomm = async (req, res) => {
    // OPTIONAL
    const searchLocs = req.body.searchLocs;
    const searchType = req.body.searchType;
    const minPrice = parseFloat(req.body.minPrice);
    const maxPrice = parseFloat(req.body.maxPrice);
    // CRUCIAL
    const returnLength = parseInt(req.body.returnLength);
    const accommLength = parseInt(req.body.accommLength);
    // Get the general recommended accomms based
    // on the top rating of the recommendations
    try {
        if (!returnLength && returnLength <= 0) throw new Error("Return Length must be a postiive integer");
        if (!accommLength && accommLength <= 0) throw new Error("Accomm Length must be a positive integer");
        // the ultimate return object
        let returnobject = {}
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
            let rating = ((sum+1)/(reviewnum+1)).toFixed(2);// adding 1 to numerator and denominator
            // to estimate accurate rating in case reviews are too low
            sortlist.push({accommId: accomm._id, rating: rating});
        }
        // then order the sorted list by rating
        sortlist.sort((a, b)=>{return b.rating - a.rating})

        // get only the return length
        // this is for the top rated flag
        if (returnLength <= sortlist.length) sortlist = sortlist.slice(0, returnLength);
        // append the sortlist to the return object
        returnobject.topAccomms = sortlist;

        // from searches of other optional requirements
        if (searchLocs) {
            let locslist = randsearch.filter((elem)=>{
                return (elem.address.province.toLowerCase() == searchLocs.toLowerCase())
            })
            if (returnLength <= locslist.length) locslist = locslist.slice(0, returnLength);
            returnobject.nearAccomms = locslist;
        }

        if (searchType) {
            let typelist = randsearch.filter((elem)=>{
                return (elem.accommodationType.toLowerCase() == searchType.toLowerCase())
            })
            if (returnLength <= typelist.length) typelist = typelist.slice(0, returnLength);
            returnobject.similarType = typelist;
        }

        if (minPrice != null && maxPrice != null) {
            if (minPrice < 0) throw new Error("Minimum price must be a positive float.");
            if (maxPrice < 0) throw new Error("Maximum price must be a positive float.");
            if (minPrice > maxPrice) throw new Error("Minimum price must be less than max price");
            let pricelist = randsearch.filter((elem)=>{
                return (parseFloat(elem.priceRange.minPrice) >= minPrice && parseFloat(elem.priceRange.maxPrice) <= maxPrice)
            })
            if (returnLength <= pricelist.length) pricelist = pricelist.slice(0, returnLength);
            returnobject.similarPrice = pricelist;
        }

        // finally return
        res.send({success: true, result: returnobject});

    } catch (error) {
        res.send({success: false, error: "Search Recommendation Failed"});
        console.error(error);
    }

    //res.send("I am recommending accommodations.");
}

//bookmark functionality
//req.body is an object that should have:
//      - two ids, the user and the id of accommodation to be bookmarked
//if success, it will have res.body that contains
//  - a key "success" with a value true else false
//  - a key error with a value "Bookmark Success" else "Bookmark Failed"
const bookmarkAccomm = async (req, res) => {
    try {
        const bookmark_details = req.body;

        // accomm_id is added to bookmarks array
        User.updateOne(
            { _id: bookmark_details.user_id },
            { $addToSet: { bookmarks: bookmark_details.accomm_id } }
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
const removeBookmarkAccomm = async (req, res) => {
    try {
        const bookmark_details = req.body;

        //accomm_id is removed from bookmark array
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