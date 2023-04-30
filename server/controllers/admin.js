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
            res.send("Successfully resolved report");
        })
        .catch((error) => {
            console.log(err);
            res.send({success: false, error: "Resolving failed"});
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
    if (body.onlyPending===true)  query.push({status: 'Pending'});
    if (body.onlyResolved===true) query.push({status: 'Resolved'});
    if (query.length>0) {
        Report.find({$or: query})
        .then((result) =>{
            res.send({success: true, result: result});
        })
        .catch((error) => {
            console.log(error);
            res.send({success: false, error: "Viewing Failed"});
        });
    }else res.send({success: true, result: {}});

}


//A JS method for acquiring an object of data about the database
//for admin to study
const dataAnalytics = async (req, res) => {
    
    //Retrieval of the following data
    
    //Number of Users
    const numUsers = await User.count();

    //Number of Accommodations
    const numAccomm = await Accommodation.count();

    //Number of Reports
    const numReports = await Report.count();

    //Number of Reviews
    const numReviews = await Review.count();

    // const accomm_MaxReports = await 

    const db_details = {
        numUsers: numUsers,
        numAccomm: numAccomm,
        numReports: numReports,
        numReviews: numReviews
    }


    console.log(db_details);
    

    
    
    res.send({success: true, return: req.body});
}


export default {
    resolveReport, 
    viewReports,
    dataAnalytics
}
