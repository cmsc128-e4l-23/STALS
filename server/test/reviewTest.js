import needle from "needle";
import mongoose from "mongoose";

/* ======================= REVIEW FUNCTIONALITIES TEST ======================= */

const reviewId = "6441644367c42f1489bb4129";
const userId = "64415c5344582ba43b014e14";
const propertyId = "643665dccee7fa1d7dd408ea";

const data = {
    userId: userId,
    propertyId: propertyId,
    content: "I like it",
    rating: 5,
    photos: [{filename: "Photo1"}]
}

const data2 = {
    userId: userId,
    propertyId: propertyId,
    content: "Very mid",
    rating: 3,
    photos: [{filename: "Insert very mid photo"}]
}

// Adding Review
// needle.post("http://localhost:3001/addReview",
//     data,
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post("http://localhost:3001/addReview",
//     data2,
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// Edit Review
needle.post("http://localhost:3001/editReview",
    {   
        _id: reviewId,
        content: "I hate it",
        rating: 1,
        photos: [{filename: "Photo2"}, {filename: "Photo3"}]
        // photos: ["Photo2", "Photo3"]
    },
    (err, res) => {
        console.log(res.body);
    }
)

// // Edit Review 2 (revert changes)
// needle.post("http://localhost:3001/editReview",
//     {   
//         id: reviewId,
//         content: "I like it",
//         rating: 5,
//         photos: [{filename: "Photo1"}]
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// Delete Review
// needle.post("http://localhost:3001/deleteReview",
//     {
//         id: reviewId
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// needle.post("http://localhost:3001/getReview",
//     {
//         userId: userId
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )