import Accommodation from "../models/Accommodation.js";
import Report from "../models/Report.js";

const addAccomm = async (req, res) => {
    res.send("I am adding accommodation");
}

const archiveAccomm = async (req, res) => {
    
    const accomm_details = req.body;

    Accommodation.updateOne(
        { _id: accomm_details._id },
        { $set: {archived: true} }
        )
        .then((result) => {
            res.send("Successfully archived accommodation");
        })
        .catch((error) => {
            console.log(err);

            res.send({success: false, error: "Archive Failed"});
        })
}

const unarchiveAccomm = async (req, res) => {

    const accomm_details = req.body;

    Accommodation.updateOne(
        { _id: accomm_details._id },
        { $set: {archived: false} }
        )
        .then((result) => {
            res.send("Successfully unarchived accommodation");
        })
        .catch((error) => {
            console.log(err);

            res.send({success: false, error: "Unarchive Failed"});
        })
}

const deleteAccomm = async (req, res) => {
    res.send("I am delete accommodation");
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
    
    const searchString = {"$regex": req.body.searchString};
    
    
    Accommodation.find({$or: [{name: searchString}, {"address.postCode": searchString}, {"address.street": searchString}, {"address.barangay": searchString}, {"address.city": searchString}, {"address.province": searchString}, {"address.region": searchString} ]})
    .then((result) =>{
        res.send({success: true, result: result});
    })
    .catch((error) => {
        console.log(err);
        res.send({success: false, error: "Search Failed"});
    })



    // res.send("I am searching accommodation");
}

const generateRep = async (req, res) => {
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

const reportAccom = async (req, res) => {
    try {
        const report_details = req.body;
        const report = new Report({
            user: report_details.user_id,
            reported: report_details.reported_id,
            classification: report_details.classification,
            content: report_details.content,
            status: "Pending"
        });
        const savedreport = await report.save();
        res.status(201).json(savedreport);
    }  catch (err) {
        res.status(500).json({error: err.message});
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
    reportAccom
}