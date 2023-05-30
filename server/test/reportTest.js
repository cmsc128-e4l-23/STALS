import needle from "needle";
import mongoose from "mongoose";


const data1 = {
    user : "p3shiro@up.edu.ph",
    reported_id : "64744436264fef98bcbcbb5d",
    classification : "Accommodation",
    content : "Very illicit",
    status : "Pending"
};

const data2 = {
    user : "p3shiro@up.edu.ph",
    reported_id : "64744436264fef98bcbcbb5d",
    classification : "Accommodation",
    content : "Very mid",
    status : "Resolved"
};

const data3 = {
    user : "p3shiro@up.edu.ph",
    reported_id : "64744436264fef98bcbcbb5d",
    classification : "Accommodation",
    content : "Basta",
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