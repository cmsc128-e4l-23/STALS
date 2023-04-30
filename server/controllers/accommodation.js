import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs"

import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Report from "../models/Report.js";

const addAccomm = async (req, res) => {
    try{
        //Getting the input
        let accomm_details = req.body;

        //Completing accommodation details given the input
        const newAccommodation = new Accommodation({
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
            priceRange: accomm_details.priceRange,
            description: accomm_details.description,
            photos: accomm_details.photos,
            restrictions: accomm_details.restrictions,
            security: accomm_details.security,
            archived: accomm_details.archived
        });
        
        //Saves the accommodation to the database
        const savedAccommodation = await newAccommodation.save();
        res.status(201).json(savedAccommodation);
    }catch (err){
        console.log(err.message);
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

    const searchString = { "$regex": req.body.searchString, "$options": "i" };


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
    try {
        const bookmarks = await fetchBookmarks(req.body._id);                           // Retrieve bookmarks given user id

        const doc = new PDFDocument();                                                  // Create pdf document
        const fileName = `report-${new Date().getTime()}.pdf`;                          // Set filename and path. Only for testing with needle
        const filePath = path.join("./test/Download", fileName);
        doc.pipe(fs.createWriteStream(filePath));


        // doc.pipe(res)       // Use instead if implemented on web browser already
    
        // Edit the PDF file
        doc.fontSize(20).text('Bookmarked Accommodations', { underline: true});
        doc.moveDown();
        bookmarks.forEach((accommodation, index) => {
            doc.fontSize(16).text(`#${index + 1}: ${accommodation.name}`);
            doc.moveDown();
            if(accommodation.landmarks){
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

            if(accommodation.amenities){
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
            
            if(accommodation.restrictions.phoneSignal){
                // doc.fontSize(12).text(`   Phone Signal: ${accommodation.restrictions.phoneSignal}`);
                doc.font("./font/Helvetica-BoldOblique.ttf").fontSize(12).text(`   Phone Signal:`)
                doc.font("./font/Helvetica.ttf").text(`      ${accommodation.restrictions.phoneSignal}`);
            }
            
            doc.moveDown(); 
            if(accommodation.security){
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
    Accommodation.findById('643665dccee7fa1d7dd408ea')
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log(error)
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
            {_id: report_details.user_id},
            { $push: {reports: custom_id} }
        ).then((result) => {
            res.send("Successfully appended report to user");
        })
        .catch((error) => {
            console.log(error);
            res.send({success: false, error: "Report Appending Failed"});
        });
    }  catch (err) {
        res.status(500).send({error: err.message});
        console.error(err);
    }
    //res.send("I am reporting an accommodation");
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
    removeBookmarkAccomm,
    reportAccomm
}