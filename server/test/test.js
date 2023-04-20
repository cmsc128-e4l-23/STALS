import needle from "needle";
import mongoose from "mongoose";

// Add Accommodation
// const url = "http://localhost:3001/addAccomm";
// const newAccommodation = {
//     accommodationID: new mongoose.Types.ObjectId(),
//     name: "A Place to Stay At",
//     landmarks: ["Nearby Mall"],
//     address: {
//       postCode: "1234",
//       street: "Street 10",
//       barangay: "Barangay 11",
//       city: "City 12",
//       province: "Laguna",
//       region: "CALABARZON"
//     },
//     generalLocation: 1,
//     accommodationType: "Transient",
//     amenities: "Free Wi-Fi",
//     priceRange: {
//       minPrice: 5000,
//       maxPrice: 10000
//     },
//     description: "A place to stay at!",
//     photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
//     restrictions: {
//       curfew: "11pm",
//       pets: "Not Allowed",
//       cooking: "Allowed",
//       visitors: "Upon Approval",
//       coedStatus: "No",
//       wifi: "With WiFi",
//       phoneSignal: "Fair"
//     }
//   };

// needle.post(url, newAccommodation, { json: true }, (err, res, body) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(body);
//   }
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
//                lastName: "Last", email: "firstlast@gmail.com", password: "pass123", phoneNumber: "09123456781",
//                birthday: "January 31, 1970", sex: "Male"};

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


//Testing delete accommodation
// needle.delete("http://localhost:3001/deleteAccomm",
//     {
//         _id: "6437c2d8b74cee2c7bfbc15f"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );