import Accommodation from "../models/Accommodation.js";
import Report from "../models/Report.js";
import User from "../models/User.js";
import Review from "../models/Review.js";

/*
Marks the report as resolved
*/
const resolveReport = async (req, res) => {
    const report_details = req.body;
    Report.updateOne(
        { _id: report_details._id },
        { $set: {status: 'Resolved'} }
        )
        .then((result) => {
            res.send({success: true, msg: "Resolving succeeded"});
        })
        .catch((error) => {
            res.send({success: false, msg: "Resolving failed", error: error});
        })
}

/*
View all reports so far
Checks for the following req.body keys (bools):
onlyPending, onlyResolved
Both could be true to view both
*/
const viewReports = async (req, res) => {
    const body = req.body;
    let query = []
    if (body.onlyPending==='true')  query.push({status: 'Pending'});
    if (body.onlyResolved==='true') query.push({status: 'Resolved'});
    if (query.length>0) {
        Report.find({$or: query})
        .then((result) =>{
            res.send({success: true, msg: "Viewing Succeeded", result: result});
        })
        .catch((error) => {
            res.send({success: false, msg: "Viewing Failed", error: error});
        });
    }else res.send({success: false, msg: "onlyPending and onlyResolved in the request body have no 'true' values", result: {}});
}

//A JS method for acquiring details about the database
const dataAnalytics = async (req, res) => {
    try{
        const numUsers = await User.count();
        const numAccomm = await Accommodation.count();
        const numReports = await Report.count();
        const numReviews = await Review.count();

        const db_details = {
            numUsers: numUsers,
            numAccomm: numAccomm,
            numReports: numReports,
            numReviews: numReviews
        }
        res.send({success: true, msg: "Successfully retrieve admin data", return: db_details});
    }
    catch (error){
        res.send({ success: false, msg: "Unsuccessfully retrieve admin data", error: error });
    }
}

export default {
    resolveReport, 
    viewReports,
    dataAnalytics
}
