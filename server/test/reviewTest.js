import needle from "needle";
import mongoose from "mongoose";

// Object IDs (change this for different databases)
// const reviewId = "644c8b41a20a2208b34cb4b7";
// const userId = "64415c5344582ba43b014e14";
// const propertyId = "643665dccee7fa1d7dd408ea";

// Review Data (for adding reviews)
const data1 = {
    userId: "644cd8a4dad90ff1fc7d1513",
    propertyId: "644cdb964c5e0d977fa685ac",
    content: "I like it",
    rating: 5,
    photos: [{filename: "Photo1"}]
}

const data2 = {
    userId: "644cd8a4dad90ff1fc7d1511",
    propertyId: "644cdb964c5e0d977fa685af",
    content: "Very mid",
    rating: 3,
    photos: [{filename: "Insert very mid photo"}]
}

const data3 = {
    userId: "644cd8a4dad90ff1fc7d150f",
    propertyId: "644cdb964c5e0d977fa685b2",
    content: "I like it",
    rating: 1,
    photos: [{filename: "Photo1"}]
}


// =========================== ADDING REVIEW ===========================
// Add Review
needle.post("http://localhost:3001/addReview",
    data1,
    (err, res) => {
        console.log(res.body);
    }
);

// Add Review 2
needle.post("http://localhost:3001/addReview",
    data2,
    (err, res) => {
        console.log(res.body);
    }
);

needle.post("http://localhost:3001/addReview",
    data3,
    (err, res) => {
        console.log(res.body);
    }
);

// =========================== EDITING REVIEW ===========================
// // Edit Review
// needle.post("http://localhost:3001/editReview",
//     {   
//         _id: reviewId,
//         content: "I hate it",
//         rating: 1,
//         photos: [
//             {filename: "Photo2"}
//             // {filename: "Photo3"} //doesn't work
//         ]
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// // Edit Review 2 (revert changes)
// needle.post("http://localhost:3001/editReview",
//     {   
//         _id: reviewId,
//         content: "I like it",
//         rating: 5,
//         photos: [{filename: "Photo1"}]
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// =========================== DELETING REVIEW ===========================
// needle.post("http://localhost:3001/deleteReview",
//     {
//         _id: reviewId,
//         userId: userId
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// =========================== GETTING REVIEW ===========================
// // Get Review 1 (userID)
// needle.post("http://localhost:3001/getReview",
//     {
//         userId: userId
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// // Get Review 2 (propertyID)
// needle.post("http://localhost:3001/getReview",
//     {
//         propertyId: propertyId
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )