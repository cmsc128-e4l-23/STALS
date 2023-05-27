import Accommodation from "../models/Accommodation.js";
import Report from "../models/Report.js";
import User from "../models/User.js";
import Visit from "../models/Visit.js";

/*
Marks the report as resolved
*/
const resolveReport = async (req, res) => {
    const report_details = req.body;
    Report.updateOne(
        { _id: report_details._id },
        { $set: { status: 'Resolved' } }
    )
        .then((result) => {
            if (result.modifiedCount < 1) { res.send({ success: false, msg: "Resolved no reports" }) }
            else { res.send({ success: true, msg: "Resolving succeeded" }) }
        })
        .catch((error) => {
            res.send({ success: false, msg: "Resolving failed", error: error });
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
    if (body.onlyPending === true) query.push({ status: 'Pending' });
    if (body.onlyResolved === true) query.push({ status: 'Resolved' });
    if (query.length > 0) {
        Report.find({ $or: query })
            .then((result) => {
                res.send({ success: true, msg: "Viewing Succeeded", result: result });
            })
            .catch((error) => {
                res.send({ success: false, msg: "Viewing Failed", error: error });
            });
    } else res.send({ success: false, msg: "onlyPending and onlyResolved in the request body have no 'true' values", result: [] });
}

//POST method incrementing the number of visits on STALS on a particular date
/*
{
    year: a Number value of the year,
    month: a Number value of the month,
    day: a Number value of the day
}
*/
const incNumVisits = async (req, res) => {
    try {
        const input = req.body;
        const visitResult = await Visit.findOne(input);
        if (visitResult) {
            await Visit.findByIdAndUpdate(
                visitResult._id,
                { $set: { numVisits: visitResult.numVisits + 1 } }
            );
            res.send({ success: true, msg: "incrementing visits succeeded" });
        } else {
            let newData = input;
            newData.numVisits = 1;
            const newVisit = new Visit(newData);
            await newVisit.save();
            res.send({ success: true, msg: "incrementing visits succeeded" });
        }
    } catch (error) {
        res.send({ success: false, msg: "incrementing visits failed", error: error });
    }
}

//POST method for getting the number of visits on STALS 
//Input
/*
{
    year: a Number value of the year,
    month: a Number value of the month,
    day: a Number value of the day
}
*/
const getVisits = async (req, res) => {
    try {

        //retrieving the Visit object based on input
        const input = req.body;
        const findData = { $and: [] }
        if (input.year) findData.$and.push({ year: input.year });
        if (input.month) findData.$and.push({ month: input.month });
        if (input.day) findData.$and.push({ day: input.day });
        let result = await Visit.find(findData);

        //removed the _id values
        let returnVals = []
        for (let i = 0; i < result.length; i++) {
            const val = {
                year: result[i].year,
                month: result[i].month,
                day: result[i].day,
                numVisits: result[i].numVisits
            }
            returnVals.push(val);
        }

        res.send({ success: true, msg: "getting Visits succeeded", return: returnVals });

    } catch (error) {
        res.send({ success: false, msg: "getting Visits failed", error: error });
    }
}

//GET method for getting the number of pending applications and its number
const getPendApp = async (req, res) => {
    try {
        var pendAppsTemp = await Accommodation.find({ archived: true });
        const numPendApps = pendAppsTemp.length;

        //removed id for security reasons, except for the id in the price range
        //which idk why is there an id in price range 
        let pendApps = [];
        for (let i = 0; i < pendAppsTemp.length; i++) {
            let doc = pendAppsTemp[i].toJSON();
            delete doc._id;
            delete doc.__v;
            const user = await User.findById(doc.owner)
            doc.owner = user.email;
            pendApps.push(doc);
        }
        res.send({ success: true, msg: "Successfully retrieve pending applications", numPendApps: numPendApps, pendApps: pendApps });
    } catch (error) {
        res.send({ success: false, msg: "Unsuccessfully retrieve pending applications", error: error });
    }
}

//GET method for acquiring details about the database
const dataAnalytics = async (req, res) => {
    try {
        //Number of registered accounts to be asked further
        const numRegUsers = await User.count();

        //Number of accounts tagged as accommodation owner
        const numAccommOwners = (await User.find({ owner: { $exists: true } })).length;

        //Number of accounts tagged as student
        const numStudents = (await User.find({ userType: "Student" })).length

        //Number of approved accommodations
        const numApprovedAccomm = (await Accommodation.find({ archived: false })).length

        const db_details = {
            numRegUsers: numRegUsers,
            numAccommOwners: numAccommOwners,
            numStudents: numStudents,
            numApprovedAccomm: numApprovedAccomm
        }
        res.send({ success: true, msg: "Successfully retrieve admin data", return: db_details });
    }
    catch (error) {
        res.send({ success: false, msg: "Unsuccessfully retrieve admin data", error: error });
    }
}

const approveAccomm = async (req, res) => {
    try{
        const input = req.body;

        if(input.accomm_id){
            await Accommodation.updateOne(
                { _id: input.accomm_id },
                { $set: { approved: true } }
            )
            res.send({ success: true, msg: "Successfully approve accommodation" });
        }else{
            res.send({ success: false, msg: "Unsuccessfully approve accommodation", error: "No accomm_id input provided"});
        }
        
    }
    catch (error){
        res.send({ success: false, msg: "Unsuccessfully approve accommodation", error: error });
        
    }
}

export default {
    getPendApp,
    incNumVisits,
    getVisits,
    resolveReport,
    viewReports,
    dataAnalytics,
    approveAccomm
}
