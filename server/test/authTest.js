import needle from "needle";
import mongoose from "mongoose";

// ========================== LOG-IN ==========================
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

// ========================== SIGN-UP ==========================
// const url = "http://localhost:3001/signup";
// const data1 = { userType: "Student", firstName: "Maui", 
//                lastName: "Tate", email: "mtate@gmail.com", password: "go ahead", phoneNumber: "09123456781",
//                birthday: "January 31, 1970", sex: "Male"};

// const data2 = { userType: "Student", firstName: "Drey", 
//                lastName: "Tuaz", email: "dtuaz@gmail.com", password: "pass", phoneNumber: "09223456781",
//                birthday: "January 1, 1970", sex: "Male"};

// const data3 = { userType: "Student", firstName: "Francis", 
//                lastName: "Ching", email: "fching@gmail.com", password: "pass123", phoneNumber: "09423456781",
//                birthday: "January 2, 1970", sex: "Male"};

// needle.post(url, data1, {json: true}, (err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(body);
//     }
// });

// needle.post(url, data2, {json: true}, (err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(body);
//     }
// });
// needle.post(url, data3, {json: true}, (err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(body);
//     }
// });

// ========================== SESSION HANDLING ==========================
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

// ========================== CHANGE PASSWORD ==========================

// needle.post("http://localhost:3001/login",
//     {
//         email: "firstlast@gmail.com",
//         password: "password4",
//     },
//     (err, res) =>{
//         console.log(res.body);
//     }
// );

// needle.post("http://localhost:3001/changePassword",
//     {
//         user_email: "firstlast@gmail.com",
//         old_password: "password4",
//         new_password: "pass123"
//     },
//     (err, res) =>{
//         console.log(res.body);
//     }
// );