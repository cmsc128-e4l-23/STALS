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
// const data = { userType: "Student", firstName: "First", 
//                lastName: "Last", email: "firstlast@gmail.com", password: "pass123", phoneNumber: "09123456781",
//                birthday: "January 31, 1970", sex: "Male"};

// needle.post(url, data, {json: true}, (err, res, body) => {
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
