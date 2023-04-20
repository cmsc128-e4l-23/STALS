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
    Report.find({$or: query})
    .then((result) =>{
        res.send({success: true, result: result});
    })
    .catch((error) => {
        console.log(err);
        res.send({success: false, error: "Viewing Failed"});
    })

}

export default {
    resolveReport, viewReports
}
