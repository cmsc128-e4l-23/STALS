import needle from "needle";
import mongoose from "mongoose";


const data1 = {
    user_id : "644cd8a4dad90ff1fc7d1513",
    reported_id : "644cdb964c5e0d977fa685ac",
    classification : "Accommodation",
    content : "Very illicit",
    status : "Pending"
};

const data2 = {
    user_id : "644cd8a4dad90ff1fc7d1511",
    reported_id : "644cdb964c5e0d977fa685af",
    classification : "Accommodation",
    content : "Very mid",
    status : "Resolved"
};

const data3 = {
    user_id : "644cd8a4dad90ff1fc7d150f",
    reported_id : "644cd8a4dad90ff1fc7d1511",
    classification : "User",
    content : "He uses foul language",
    status : "Pending"
};

needle.post("http://localhost:3001/reportAccomm",
    data1,
    (err, res) => {
        console.log(res.body);
    }
);

// Add Review 2
needle.post("http://localhost:3001/reportAccomm",
    data2,
    (err, res) => {
        console.log(res.body);
    }
);

needle.post("http://localhost:3001/reportAccomm",
    data3,
    (err, res) => {
        console.log(res.body);
    }
);