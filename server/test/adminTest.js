import needle from "needle";
import mongoose from "mongoose";

needle.post("http://localhost:3001/dataAnalytics",
    {},
    (err, res) => {
        console.log(res.body);
    }
)