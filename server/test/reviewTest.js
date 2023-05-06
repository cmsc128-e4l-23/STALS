import needle from "needle";
import mongoose from "mongoose";

// Object IDs (change this for different databases)
// const reviewId = "644df0fa899d98c980e65ad7";
// const userId = "644cd8a4dad90ff1fc7d150f";
// const propertyId = "644ce1aad31be0a75c33df6e";

// note that the current database has still report ids
// in the array for the users but not on accomms
// please delete them first before proceeding:

// db.reviews.deleteMany({})
// db.users.updateMany({}, {$set: {reviews:[]}})
// db.accommodations.updateMany({}, {$set: {reviews:[]}})

// let's just generate data here
// const datalen = 10;
// const propids = [
//     "644cdb964c5e0d977fa685ac",
//     "644cdb964c5e0d977fa685af",
//     "644cdb964c5e0d977fa685b2",
//     "644ce1aad31be0a75c33df6b",
//     "644ce1aad31be0a75c33df6e",
//     "644ce1aad31be0a75c33df71",
//     "644ce1aad31be0a75c33df74",
// ];

// const userids = [
//     "644cd8a4dad90ff1fc7d150f",
//     "644cd8a4dad90ff1fc7d1511",
//     "644cd8a4dad90ff1fc7d1513",
// ]

// const data = []
// for (let i=0; i<datalen; i++) {
//     data[i] = {
//         userId: userids[Math.floor(Math.random() * userids.length)],
//         propertyId: propids[Math.floor(Math.random() * propids.length)],
//         content: "Sample",
//         rating: Math.floor(Math.random() * 6),
//         photos: []
//     }
// }

// // Review Data (for adding reviews)
// const data1 = {
//     user: "mtate@gmail.com",
//     propertyId: "644e58b2f157a1f22a80e741",
//     content: "I like it",
//     rating: 5,
//     photos: [{ filename: "Photo1" }]
// }

// const data2 = {
//     user: "mtate@gmail.com",
//     propertyId: "644e58b2f157a1f22a80e741",
//     content: "Very mid",
//     rating: 3,
//     photos: [{filename: "Insert very mid photo"}]
// }

// const data3 = {
//     user: "mtate@gmail.com",
//     propertyId: "644e58b2f157a1f22a80e741",
//     content: "I like it",
//     rating: 1,
//     photos: [{filename: "Photo1"}]
// }


// // =========================== ADDING REVIEW ===========================
// // Add Review
// needle.post("http://localhost:3001/addReview",
//     data1,
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

// needle.post("http://localhost:3001/addReview",
//     data3,
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// Add all reviews
// for (let i=0; i<datalen; i++) {
//     needle.post("http://localhost:3001/addReview",
//     data[i], (err, res) => {
//         console.log(res.body);
//     }
//     )
// }

// =========================== EDITING REVIEW ===========================
// // Edit Review
// needle.post("http://localhost:3001/editReview",
//     {
//         _id: "64560ba58d797a0d06aa9661",
//         rating: 5,
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// // Edit Review 2 (revert changes)
// needle.post("http://localhost:3001/editReview",
//     {
//         _id: "64560ba58d797a0d06aa9661",
//         content: "I like it",
//         rating: 5,
//         photos: [{ filename: "Photo1" }]
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// =========================== DELETING REVIEW ===========================
// needle.post("http://localhost:3001/deleteReview",
//     {
//         _id: "64560834900198adf49dc33d",
//         user: "mtate@gmail.com",
//         propertyId: "644e58b2f157a1f22a80e741"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// =========================== GETTING REVIEW ===========================
// // Get Review 1 (userID)
// needle.post("http://localhost:3001/getReview",
//     {
//         user: "mtate@gmail.com"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )

// // Get Review 2 (propertyID)
// needle.post("http://localhost:3001/getReview",
//     {
//         propertyId: "644e58b2f157a1f22a80e738"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// )