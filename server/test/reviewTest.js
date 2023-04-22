import needle from "needle";
import mongoose from "mongoose";

// Object IDs (change this for different databases)
const reviewId = "64434a75f83448b826f4a3bc";
const userId = "64415c5344582ba43b014e14";
const propertyId = "643665dccee7fa1d7dd408ea";

// Review Data (for adding reviews)
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

// =========================== ADDING REVIEW ===========================
// Add Review
// needle.post("http://localhost:3001/addReview",
//     data,
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// // Add Review 2
// needle.post("http://localhost:3001/addReview",
//     data2,
//     (err, res) => {
//         console.log(res.body);
//     }
// );

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