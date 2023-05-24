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
            // check if the user is an owner
            if (currUser.userType != "Owner") {
                throw new Error("The user inputted is not an owner");
            }

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
            await User.findByIdAndUpdate(
                currUser._id, 
                { $push: { "owner.propertiesList": savedAccommodation._id }},
                { "new": true, "upsert": true }
            );

            res.send({ success: true, msg: "Successfully added accommodation" });
        } else {
            throw new Error("User not found");
        }
    } catch(error) {
        res.send({ success: false, msg: "Unsuccessfully added accommodation", error: error.message });
    }
}

//Method for archiving accommodations
const archiveAccomm = async (req, res) => {

    try{
        const accomm_details = req.body;
        // the accommodation should exist
        // and not archived in the first place
        const accomm = await Accommodation.findById(accomm_details._id);
        if (!accomm) {
            throw new Error("Accommodation does not exist");
        } else if (accomm.archived) {
            throw new Error("Accommodation already archived");
        } else {
            const result = await Accommodation.findByIdAndUpdate(
                accomm_details._id,
                { $set: { archived: true }}
            );
    
            if (result){
                res.send({ success: true, msg: "Successfully archived accommodation" });
            } else {
                throw new Error("Failed to find and archive accommodation");
            }
        }
       
    } catch (error){
        res.send({ success: false, msg: "Unsuccessfully archived accommodation", error: error.message });
    }
}

//Function for unarchiving accommodations
const unarchiveAccomm = async (req, res) => {

    try{
        const accomm_details = req.body;
        // the accommodation should exist
        // and archived in the first place
        const accomm = await Accommodation.findById(accomm_details._id);
        if (!accomm) {
            throw new Error("Accommodation does not exist");
        } else if (!accomm.archived) {
            throw new Error("Accommodation already unarchived");
        } else {
            const result = await Accommodation.findByIdAndUpdate(
                accomm_details._id,
                { $set: { archived: false }}
            );
    
            if (result){
                res.send({ success: true, msg: "Successfully unarchived accommodation" });
            } else {
                throw new Error("Failed to find and unarchive accommodation");
            }
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

            await Accommodation.findByIdAndUpdate(
                {_id: accomm_details._id},
                updateObject
            );

            res.send({ success: true, msg: "Successfully edited accommodation" });
        } else {
            throw new Error("Accommodation not found");
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
        res.send({ success: false, msg: "Unsuccessfully deleted accommodation", error: err.message });
    }
}

/*
Search Functionality
req.body is an object that should have:
    - a key named "searchString" that contains a string to be searched in the database.
        The string is used to search the accommodation name, type, nearby landmarks,
        amenities involved, and address.
    - a key named "returnLength" which would be the number of accommodations to be returned 
    - it assumes that the frontend would handle whether the keys are valid or not

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
    const returnLength = parseInt(req.body.returnLength);

    const addressArgs = (Object.keys(Accommodation.schema.paths)) // arguments for address
        .filter((key) => key.includes("address."))
        .map((val) => {
           let obj = new Object();
           obj[val] = searchString;
           return obj
        })

    Accommodation.find({ $or: [
        { name: searchString },
        { accommodationType: searchString },
        { landmarks: searchString },
        { amenities: searchString },
        ...addressArgs] })
        .limit(returnLength)
        .then((result) => {
            res.send({ success: true, msg: "Search Accommodation Successful", result: result });
        })
        .catch((error) => {
            console.log(error);
            res.send({ success: false, msg: "Search Accommodation Failed", err: error});
        })
    
}

/*
Search Recommendation
req.body is an object that should have:
    - a key named "searchString" that contains a string to be searched in the database
    - a key named "returnLength" which would be the number of accommodations to be returned
    - it assumes that the frontend would handle whether the keys are valid or not

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
    const searchString = { "$regex": req.body.searchString, "$options": "i" };
    const returnLength = parseInt(req.body.returnLength);

    const addressArgs = (Object.keys(Accommodation.schema.paths)) // arguments for address
        .filter((key) => key.includes("address."))
        .map((val) => { // val is interpreted as a symbol not a var for some reason
            let obj = new Object();
            obj[val] = searchString;
            return obj
        })

    const accommresult = await Accommodation.find({ $or: [{ name: searchString }, ...addressArgs],
        archived: false, reviews: {$ne: []} })
        .limit(returnLength)
        .catch((error) => {
            console.log(error);
            return res.send({ success: false, msg: "Search Accommodation Failed", err: error});
        })

    // from those searches arrange those by the ratings
    const sortlist = await Promise.all(accommresult.map(async (accomm) => {
        let sum = 0;
        for (let rev of accomm.reviews) {
            let actualrev = await Review.findById(rev._id);
            sum += actualrev.rating;
        }
        // calculate the total rating
        let rating = parseFloat((sum/accomm.reviews.length).toFixed(2));
        
        return {accommodation: accomm, rating: rating, ratingNum: accomm.reviews.length};
        })) // then sort it
    sortlist.sort((a, b)=>{return b.rating - a.rating})

    res.send({success: true, msg: "Search Recommendation Successful", result: sortlist})
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
    const bookmark_details = req.body;

    try {
        // first check if the ids are valid
        const user = await User.findById(bookmark_details.user_id);
        const accomm = await Accommodation.findById(bookmark_details.accomm_id);
        if (!user) return res.send({success: false, msg: "User not found" })
        if (!accomm) return res.send({success: false, msg: "Accommodation not found" })

        // check if it's already bookmarked
        if (user.bookmarks.includes(accomm._id))
        return res.send({success: false, msg: "Accommodation already bookmarked" })
        // accomm_id is added to bookmarks array
        User.updateOne(
            { _id: bookmark_details.user_id },
            { $addToSet: { bookmarks: bookmark_details.accomm_id } }
        ).then((result) => {
            res.send({ success: true, msg: "Bookmark Success" });
        })
        .catch((error) => {
            console.log(error);
            res.send({ success: false, msg: "Bookmark Failed", err: error });
        });
    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.msg });
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
    const bookmark_details = req.body;

    try {
        // first check if the ids are valid
        const user = await User.findById(bookmark_details.user_id);
        const accomm = await Accommodation.findById(bookmark_details.accomm_id);
        if (!user) return res.send({success: false, msg: "User not found" })
        if (!accomm) return res.send({success: false, msg: "Accommodation not found" })

        // check if it's not bookmarked
        if (!(user.bookmarks.includes(accomm._id)))
            return res.send({success: false, msg:
                "Accommodation to be bookmarked is not bookmarked by user in the first place" })
        
        //accomm_id is removed from bookmark array
        User.updateOne(
            { _id: bookmark_details.user_id },
            { $pull: { bookmarks: bookmark_details.accomm_id } }
        ).then((result) => {
            res.send({ success: true, msg: "Remove Bookmark Success" });
        })
        .catch((error) => {
            console.log(error);
            res.send({ success: false, msg: "Remove Bookmark Failed", err: error });
        });
    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.msg });
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
        const bookmarks = await fetchBookmarks(req.body._id);                         // Retrieve bookmarks given user id
        if(bookmarks.length == 0){
            res.send({success: false, msg: "PDF Report Generation Failed.", error: "No bookmarks."})
        } else {
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
            });
            // "Close" the PDF file and send it to where `pipe` specifies it to go
            doc.end();
            console.log(`PDF report saved to ${filePath}`);
            res.send({success: true, msg: "PDF Report Successfully Generated."})
        }
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
        let userReportedExists = await User.findById(report.reported);
        let accommReportedExists = await Accommodation.findById(report.reported);
        if(userReportedExists || (accommReportedExists && !accommReportedExists.archived)){
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
        } else {
            res.send({success: false, msg: "Report Accommodation Failed, Targets do not exist."})
        }

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