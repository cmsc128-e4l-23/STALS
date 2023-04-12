import Accommodation from "../models/Accommodation.js";

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

const searchAccomm = async (req, res) => {
    res.send("I am searching accommodation");
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

export default {
    addAccomm,
    archiveAccomm,
    unarchiveAccomm,
    deleteAccomm,
    searchAccomm,
    generateRep,
    viewAccomm
}