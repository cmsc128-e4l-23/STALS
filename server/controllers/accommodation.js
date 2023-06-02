import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs"
import os from "os";
import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Report from "../models/Report.js";
import Review from "../models/Review.js";
import Image from "../models/Image.js";

//Method for adding accommodations
const addAccomm = async (req, res) => {
    let accomm_details = req.body;

    try {
        //NOTE: The accommodation model states that the 'owner' field contains an object
        const currUser = await User.findOne({ email: accomm_details.owner });
        if (currUser) {
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
                { $push: { "owner.propertiesList": savedAccommodation._id } },
                { "new": true, "upsert": true }
            );

            res.send({ success: true, accommId: savedAccommodation._id, userId: currUser._id, msg: "Successfully added accommodation" });
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        res.send({ success: false, msg: "Unsuccessfully added accommodation", error: error.message });
    }
}

//Method for archiving accommodations
const archiveAccomm = async (req, res) => {
    const accomm_details = req.body;

    try {
        const result = await Accommodation.findByIdAndUpdate(
            accomm_details._id,
            { $set: { archived: true } }
        );

        if (result) {
            res.send({ success: true, msg: "Successfully archived accommodation" });
        } else {
            throw new Error("Failed to find and archive accommodation");
        }
    } catch (error) {
        res.send({ success: false, msg: "Unsuccessfully archived accommodation", error: error.message });
    }
}

//Function for unarchiving accommodations
const unarchiveAccomm = async (req, res) => {
    const accomm_details = req.body;

    try {
        const result = await Accommodation.findByIdAndUpdate(
            accomm_details._id,
            { $set: { archived: false } }
        );

        if (result) {
            res.send({ success: true, msg: "Successfully unarchived accommodation" });
        } else {
            throw new Error("Failed to find and unarchive accommodation");
        }
    } catch (error) {
        res.send({ success: false, msg: "Unsuccessfully unarchived accommodation", error: error.message });
    }
}

//Function for editing accommodations
// returns a json that indicates success and sends message
// throws an error if accommodation was not found or if accommodation edit failed
const editAccomm = async (req, res) => {
    const accomm_details = req.body;

    try {
        let currAccomm = await Accommodation.findById(accomm_details._id);

        if (currAccomm) {
            const currAccommObj = currAccomm.toObject();

            //creates the updateObject that determines what would be
            //updated in the document
            const updateObject = {
                $set: {
                    ...currAccommObj, ...accomm_details,
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
                { _id: accomm_details._id },
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
    try {
        const currAccomm = await Accommodation.findByIdAndDelete(accomm_details._id);

        if (currAccomm) {
            const currUser = await User.findByIdAndUpdate(
                currAccomm.owner,
                { $pull: { 
                    "owner.propertiesList": accomm_details._id
                }}
            );
            
            const users = await User.find({});
            for(let i=0;i<users.length; i++){
                await User.findByIdAndUpdate(
                    users[i]._id,
                    {$pull: {
                        "bookmarks" : accomm_details._id
                    }}
                )
            }

            const accommReviews = await Review.find({propertyId: accomm_details._id});
            for(let i=0;i<accommReviews.length; i++){
                await Review.deleteOne({_id:accommReviews[i]._id});
                await User.findByIdAndUpdate(
                    accommReviews[i].userId,
                    {$pull: {"reviews":accommReviews[i]._id} }
                )
            }

            const accommReports = await Report.find({reported: accomm_details._id});
            for(let i=0;i<accommReports.length; i++){
                await Report.deleteOne({_id:accommReports[i]._id});
                await User.findByIdAndUpdate(
                    accommReports[i].user,
                    {$pull: {"reports":accommReports[i]._id} }
                )
            }
                
            
            const accommImages = await Image.find({attachedTo: accomm_details._id})
            for(let i=0;i<accommImages.length; i++)
                await Image.deleteOne({_id:accommImages[i]._id});

            if (currUser) {
                res.send({ success: true, msg: "Successfully deleted accommodation" })
            } else {
                throw new Error("Failed to find and edit propertyList of current user");
            }
        } else {
            throw new Error("Failed to find and delete accommodation");
        }
    } catch (err) {
        res.send({ success: false, msg: "Unsuccessfully deleted accommodation", error: err.message });
    }
}

/*
Search Functionality
req.body is an object that should have:
    - a key named "searchString" that contains a string to be searched in the database
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
const searchAccomm = (req, res) => {
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

    Accommodation.find({
        $or: [
            { name: searchString },
            ...addressArgs]
    })
        .limit(returnLength)
        .then((result) => {
            res.send({ success: true, msg: "Search Accommodation Successful", result: result });
        })
        .catch((error) => {
            console.log(error);
            res.send({ success: false, msg: "Search Accommodation Failed", err: error });
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

    const accommresult = await Accommodation.find({
        $or: [{ name: searchString }, ...addressArgs],
        archived: false, reviews: { $ne: [] }
    })
        .limit(returnLength)
        .catch((error) => {
            return res.send({ success: false, msg: "Search Accommodation Failed", err: error });
        })

    // from those searches arrange those by the ratings
    const sortlist = await Promise.all(accommresult.map(async (accomm) => {
        let sum = 0;
        for (let rev of accomm.reviews) {
            let actualrev = await Review.findById(rev._id);
            sum += actualrev.rating;
        }
        // calculate the total rating
        let rating = parseFloat((sum / accomm.reviews.length).toFixed(2));

        return { accommodation: accomm, rating: rating, ratingNum: accomm.reviews.length };
    })) // then sort it
    sortlist.sort((a, b) => { return b.rating - a.rating })

    res.send({ success: true, msg: "Search Recommendation Successful", result: sortlist })
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
        const user = await User.findOne({ email: bookmark_details.email });
        const accomm = await Accommodation.findById(bookmark_details.accomm_id);

        if (!user) throw new Error("User not found");
        if (!accomm) throw new Error("Accommodation not found");

        // check if it's already bookmarked
        if (user.bookmarks.includes(accomm._id)) throw new Error("Accommodation already bookmarked");

        // accomm_id is added to bookmarks array
        user.bookmarks.push(accomm._id);
        await user.save();
        res.send({ success: true, msg: "Bookmark Success" });

    } catch (error) {

        res.send({ success: false, msg: "Bookmark Failed", error: error.message });
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
        const user = await User.findOne({ email: bookmark_details.user });
        const accomm = await Accommodation.findById(bookmark_details.accomm_id);
        if (!user) throw new Error("User not found");
        if (!accomm) throw new Error("Accommodation not found");

        // check if it's not bookmarked
        if (!(user.bookmarks.includes(accomm._id))) throw new Error("Accomodation not on bookmark list");

        //accomm_id is removed from bookmark array

        user.bookmarks.pull(accomm._id);
        await user.save();
        res.send({ success: true, msg: "Bookmark Success" });


    } catch (error) {
        res.send({ success: false, msg: "Remove Bookmark Failed", error: error.message });
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

const writeToDoc = (doc, header, content, list) => {
    doc.font(boldFont).fontSize(fSize12).text(header)
    if (list) {
        doc.font(regularFont).fontSize(fSize12).list(content);
    } else {
        doc.font(regularFont).text(content);
    }
    doc.moveDown();
};
//Input: Accepts an object containing a key named email with the user email of the user that will be used
const generateRep = async (req, res) => {
    console.log(req.body.user);
    try {
        const user = await User.findOne({ email: req.body.user });
        if (!user) throw new Error("User not found");
        const bookmarks = await fetchBookmarks(user._id);                         // Retrieve bookmarks given user id
        if (bookmarks.length == 0) {
            res.send({ success: false, msg: "PDF Report Generation Failed.", error: "No bookmarks." })
        } else {
            const doc = new PDFDocument();    
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
            // var stream = doc.pipe(blobStream())
            doc.end();
            // stream.on('finish', function(){iframe.src = stream.toBlobURL('application/pdf')});
            res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Length', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=report.pdf`);
            doc.pipe(res);
            console.log(`PDF report sent to client`);
        }
    } catch (error) {
        console.log(error);
        res.send({ success: false, msg: "PDF Report Generation Failed.", error: error.message })
    }
};

/*
The req.body should simply contain what's in the report schema
You may refer to test.js to check how it is used
*/
const reportAccomm = async (req, res) => {
    const report_details = req.body;

    try {
        const user = await User.findOne({ email: report_details.user });
        const report = new Report({
            user: user._id,
            reported: report_details.reported_id,
            classification: report_details.classification,
            content: report_details.content,
            status: "Pending"
        });
        let userReportedExists = await User.findById(report.reported);
        let accommReportedExists = await Accommodation.findById(report.reported);
        if (userReportedExists || (accommReportedExists && !accommReportedExists.archived)) {
            await report.save();

            user.reports.push(report._id);
            await user.save();
            res.send({ success: true, msg: "Successfully reported accommodation" });

        } else {
            res.send({ success: false, msg: "Report Accommodation Failed, Targets do not exist." })
        }

    } catch (error) {
        res.send({ success: false, msg: "Report Accommodation Failed", error: error.message })
    }
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
    bookmarkAccomm,
    removeBookmarkAccomm,
    reportAccomm
}