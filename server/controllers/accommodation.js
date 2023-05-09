import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs"
import os from "os";
import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Report from "../models/Report.js";
import Review from "../models/Review.js";

//Method for adding accommodations
const addAccomm = async (req, res) => {
    //Getting the input
    let accomm_details = req.body;

    try{
        //NOTE: The accommodation model states that the 'owner' field contains an object
        const currUser = await User.findOne({ email: accomm_details.owner });

        if (currUser){
            accomm_details.owner = currUser._id
            // Check if accommodation name already exists in the database
            const existingNameAccommodation = await Accommodation.findOne({ name: accomm_details.name });
            if (existingNameAccommodation) {
                throw new Error("Accommodation with the same name already exists");
            }
            
            // Check if accommodation address already exists in the database
            const existingAddressAccommodation = await Accommodation.findOne({ address: accomm_details.address });
            if (existingAddressAccommodation) {
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

            if (!result){
                throw new Error("Error updating user in add accommodation");
            }

            res.send({ success: true, msg: "Successfully added accommodation" });
        } else {
            throw new Error("User not found");
        }
    } catch(error) {
        console.log(error);
        res.send({ success: false, msg: "Unsuccessfully added accommodation", error: error.message });
    }
}

//Method for archiving accommodations
const archiveAccomm = async (req, res) => {

    const accomm_details = req.body;

    try{
        const result = await Accommodation.findByIdAndUpdate(
            accomm_details._id,
            { $set: { archived: true }}
        );

        if (result){
            res.send({ success: true, msg: "Successfully archived accommodation" });
        } else {
            throw new Error("Failed to find and archive accommodation");
        }
    } catch (error){
        res.send({ success: false, msg: "Unsuccessfully archived accommodation", error: error.message });
    }
}

//Function for unarchiving accommodations
const unarchiveAccomm = async (req, res) => {

    const accomm_details = req.body;

    try{
        const result = await Accommodation.findByIdAndUpdate(
            accomm_details._id,
            { $set: { archived: false }}
        );

        if (result){
            res.send({ success: true, msg: "Successfully unarchived accommodation" });
        } else {
            throw new Error("Failed to find and unarchive accommodation");
        }
    } catch (error){
        res.send({ success: false, msg: "Unsuccessfully unarchived accommodation", error: error.message });
    }
}

//Function for editing accommodations
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
                res.send({ success: true, msg: "Successfully edited accommodation" })
            } else {
                throw new Error("An error occured in updating the accommodation");
            }

        } else {
            throw new Error("Accommodation not found.");
        }
    } catch (error) {
        res.send({ success: false, msg: "Unsuccessfully edited accommodation", error: error.message });
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
                res.send({ success: true, msg: "Successfully deleted accommodation" })
            } else {
                throw new Error("Failed to find and edit propertyList of current user");
            }
        } else {
            throw new Error("Failed to find and delete accommodation");
        }
    } catch (err){
        res.send({ success: false, msg: "Unsuccessful deleted accommodation", error: err.message });
    }
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
//Functions that generates a pdf file of the bookmarked accommmodations of the user
const boldFont = "./font/Helvetica-Bold.ttf";
const regularFont = "./font/Helvetica.ttf";
const boldOblique = "./font/Helvetica-BoldOblique.ttf";
const fSize12 = 12; //fontSize 12.

const writeToDoc = (doc, header, content, list) =>{
    doc.font(boldFont).fontSize(fSize12).text(header)
    if(list){
        doc.font(regularFont).fontSize(fSize12).list(content);
    } else {
        doc.font(regularFont).text(content);
    }
    doc.moveDown();
};
//Input: Accepts an object containing a key named "_id" with the user ID of the user that will be used
const generateRep = async (req, res) => {
    try {
        const bookmarks = await fetchBookmarks(req.body._id);                           // Retrieve bookmarks given user id
        const downloadFolderPath = path.join(os.homedir(), 'Downloads');
        const doc = new PDFDocument();    
        const now = new Date();                                    // Create pdf document
        const fileName = `report-${now.toISOString().slice(0, 10)}.pdf`;                          // Set filename and path. Only for testing with needle
        //adjusted to immediately head to the downloads folder of the user.
        const filePath = path.join(downloadFolderPath, fileName);
        doc.pipe(fs.createWriteStream(filePath));
        // doc.pipe(res)       // Use instead if implemented on web browser already
        // Edit the PDF file
        doc.fontSize(20).text('Bookmarked Accommodations', { underline: true});
        doc.moveDown();
        bookmarks.forEach((accommodation, index) => {
            doc.fontSize(16).text(`#${index + 1}: ${accommodation.name}`);
            doc.moveDown();
            if(accommodation.landmarks){
                writeToDoc(doc, `Landmarks:`, accommodation.landmarks.map(landmark => `${landmark}`), true);
            }
            writeToDoc(doc,`Address: `,`\u0020 ${accommodation.address.street}, ${accommodation.address.barangay}, ${accommodation.address.city}, ${accommodation.address.province}, ${accommodation.address.region}, ${accommodation.address.postCode}`, false);
            writeToDoc(doc,`Accommodation Type: `,`\u0020 ${accommodation.accommodationType}`);

            if(accommodation.amenities){
                writeToDoc(doc, `Amenities:`, accommodation.amenities.map(amenity => `${amenity}`), true);
            }
            writeToDoc(doc, `Price Range:`,`\u0020 P${accommodation.priceRange.minPrice} - P${accommodation.priceRange.maxPrice}`, false);
            writeToDoc(doc,`Description:`,`\u0020 ${accommodation.description}`);
            //Further Implementation
            // if(accommodation.photos.length > 0){
            //     for(let i=0; i<accommodation.photos.length; i++){
            //         doc.image(accommodation.photos[i], 0, 15, {width: 300});
            //     }
            // }
            if(accommodation.restrictions){
                writeToDoc(doc, `Restrictions:`, accommodation.restrictions.map(restriction => `${restriction}`), true);
            }
            doc.moveDown(); 
            if(accommodation.security){
                writeToDoc(doc, `Security:`, `\u0020 ${accommodation.security}`, false);
            }
            doc.moveDown();
            //why cant i push
        });
        // "Close" the PDF file and send it to where `pipe` specifies it to go
        doc.end();
        console.log(`PDF report saved to ${filePath}`);
        res.send({success: true, msg: "PDF Report Successfully Generated."})
    } catch (error) {
        console.log(error);
        res.send({success: false, msg: "PDF Report Generation Failed.", error: error.message})
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

        const report = new Report({
            user: report_details.user_id,
            reported: report_details.reported_id,
            classification: report_details.classification,
            content: report_details.content,
            status: "Pending"
        });
        await report.save();
        // also add that report to the user

        User.updateOne(
            {_id: report_details.user_id},
            { $push: {reports: report._id} }
        ).then((result) => {
            res.send({success: true, msg: "Successfully appended report to user"});
        })
        .catch((error) => {
            console.log(error);
            res.send({success: false, msg: "Report Appending Failed",error: error.message});
        });
    }  catch (error) {
        res.send({success: false, msg: "Report Accommodation Failed", error: error.message})
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