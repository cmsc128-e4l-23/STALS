import needle from "needle";
import mongoose from "mongoose";

// needle.post("http://localhost:3001/dataAnalytics",
//     {},
//     (err, res) => {
//         console.log(res.body);
//     }
// )

needle.post("http://localhost:3001/viewReports",
    {
        onlyPending: false,
        onlyResolved: true
    },
    (err, res) => {
        console.log(res.body);
    }
)

// needle.post("http://localhost:3001/resolveReport",
//     {
//         _id: "64590ef70727f84cb1e8a470"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )
