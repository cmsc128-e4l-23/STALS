import mongoose from "mongoose";
import needle from "needle";

// Add Accommodation
// const url = "http://localhost:3001/addAccomm";
// const data = { name: "John Doe", email: "johndoe@example.com"};

// needle.post(url, data, {json: true}, (err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(body);
//     }
// });

// Log-In
// needle.post("http://localhost:3001/login",
//     {
//         userType: "Student",
//         firstName: "Drey",
//         lastName: "Tuazon",
//         email: "dreytuaz@gmail.com",
//         password: "password",
//         phoneNumber: "09999999"
//     },
//     (err, res) =>{
//         console.log(res.body);
//     }
// );

// Sign-Up
// const url = "http://localhost:3001/register";
// const data = { userType: "Student", firstName: "First", 
//                lastName: "Last", email: "firstlast@gmail.com", password: "pass123", phoneNumber: "09123456781"};

// needle.post(url, data, {json: true}, (err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(body);
//     }
// });

// Session Handling
// needle.post("http://localhost:3001/checkifloggedin",
//     {
//         userType: "Student",
//         firstName: "Drey",
//         lastName: "Tuazon",
//         email: "dreytuaz@gmail.com",
//         password: "$2b$10$i26n2rL7/mf//kiJ.w4L4OqMGvxY0fTvS7k1LBSCfTr4zeSaQaZfa",
//         phoneNumber: "09999999"
//     },
//     (err, res) =>{
//         console.log(res.body);
//     }
// );

// Archive Accommodation
// needle.post("http://localhost:3001/archiveAccomm",
//     {
//         _id: "643665dccee7fa1d7dd408ea"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

//Unarchive Accommodation
// needle.post("http://localhost:3001/unarchiveAccomm",
//     {
//         _id: "643665dccee7fa1d7dd408ea"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post("http://localhost:3001/searchAccomm",
//     {
//         searchString: "San Tomas"
//     },
//     (err, res) => {
//         console.log(res.body.result[0].address);
//     }
// );

// try to report an owner
// needle.post("http://localhost:3001/reportAccomm",
//     {
//         user_id: new mongoose.Types.ObjectId("6440de1d68cbace501aab486"), // peter griffin would like a complaint
//         reported_id: new mongoose.Types.ObjectId("6440de1c68cbace501aab480"), // Ms dimasalang
//         classification: 'User',
//         content: "i just wanna know what happens teehee",
//     }, {json: true},
//     (err, res, body) => {
//         if (err) console.error(err);
//         else console.log(body);
//     }
// );

// reporting an accommodation
// needle.post("http://localhost:3001/reportAccomm",
//     {
//         user_id: new mongoose.Types.ObjectId("6440de1d68cbace501aab486"), // peter griffin would like a complaint
//         reported_id: new mongoose.Types.ObjectId("6440de1c68cbace501aab471"), // that one suspicious definitely not a cartel "dorm"
//         classification: 'Accommodation',
//         content: "i just wanna know what happens teehee",
//     }, {json: true},
//     (err, res, body) => {
//         if (err) console.error(err);
//         else console.log(body);
//     }
// );