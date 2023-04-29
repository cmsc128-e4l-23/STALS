import needle from "needle";
import mongoose from "mongoose";

// ========================== ADD ACCOMMODATION ==========================
// const url = "http://localhost:3001/addAccomm";
// const newAccommodation1 = {
//     accommodationID: new mongoose.Types.ObjectId(),
//     name: "White House",
//     landmarks: ["Raymundo Gate"],
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
//     restrictions: ["no visitors allowed"]
//   };

// const newAccommodation2 = {
//     accommodationID: new mongoose.Types.ObjectId(),
//     name: "Big Bellys",
//     landmarks: ["UPLB Main Gate"],
//     address: {
//       postCode: "1234",
//       street: "Street 10",
//       barangay: "Barangay 11",
//       city: "City 12",
//       province: "Laguna",
//       region: "CALABARZON"
//     },
//     generalLocation: 2,
//     accommodationType: "Transient",
//     priceRange: {
//       minPrice: 5000,
//       maxPrice: 10000
//     },
//     description: "Masarap kainan dito",
//     photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
//     restrictions: ["no wifi"]
//   };

// const newAccommodation3 = {
//     accommodationID: new mongoose.Types.ObjectId(),
//     name: "F Park",
//     landmarks: ["Student Union Building", "Bakers Hall"],
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
//     priceRange: {
//       minPrice: 5000,
//       maxPrice: 10000
//     },
//     description: "May tulugan dito",
//     photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
//     restrictions: ["no pets allowed"]
//   };
// needle.post(url, newAccommodation1, { json: true }, (err, res, body) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(body);
//   }
// });

// needle.post(url, newAccommodation2, { json: true }, (err, res, body) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(body);
//     }
//   });

//   needle.post(url, newAccommodation3, { json: true }, (err, res, body) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(body);
//     }
//   });
// ========================== ARCHIVE ACCOMMODATION ==========================
// needle.post("http://localhost:3001/archiveAccomm",
//     {
//         _id: "643665dccee7fa1d7dd408ea"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// ========================== UNARCHIVE ACCOMMODATION ==========================
// needle.post("http://localhost:3001/unarchiveAccomm",
//     {
//         _id: "643665dccee7fa1d7dd408ea"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// ========================== EDIT ACCOMMODATION ==========================
// // edit 1 (complete requirements)
// needle.post("http://localhost:3001/editAccomm",
//     {
//         _id: '643665dccee7fa1d7dd408ea',
//         name: 'Never',
//         landmarks: [ 'Gonna' ],
//         address: {
//             postCode: 'Give',
//             street: 'You',
//             barangay: 'Up',
//             city: 'Never',
//             province: 'Gonna',
//             region: 'Let'
//         },
//         generalLocation: 310771,
//         accommodationType: 'You',
//         amenities: [ 'Down' ],
//         priceRange: 4000,
//         description: 'Never gonna run around and desert you',
//         photos: [ 'and' ],
//         restrictions: ["desert", "you"],
//         security: 'Rick Astley',
//         archived: false
//     },
//     (err, res) => {
//         console.log(res.body)
//     }
// )

// // edit 2 (half requirements)
// needle.post("http://localhost:3001/editAccomm",
//     {
//         _id: '643665dccee7fa1d7dd408ea',
//         name: 'UP TRANSIENT HOUSE',
//         landmarks: [ 'Oblation', 'CAS Building' ],
//         address: {
//             postCode: '1234',
//             street: 'New Kalsada Street',
//             barangay: 'Batong Maliit',
//             city: "Los Banos",
//             province: "Laguna",
//             region: "CALABARZON"
//         },
//         generalLocation: 12345,
//         accommodationType: 'Transient',
//         archived: true
//     },
//     (err, res) => {
//         console.log(res.body)
//     }
// )

// // edit 3 (description only)
// needle.post("http://localhost:3001/editAccomm",
//     {
//         _id: '643665dccee7fa1d7dd408ea',
//         description: "BEST PLACE TO STAY! GUARANTEED 100% NO CAP!"
//     },
//     (err, res) => {
//         console.log(res.body)
//     }
// )

// // edit 4 (original edit)
// needle.post("http://localhost:3001/editAccomm",
//     {
//         _id: '643665dccee7fa1d7dd408ea',
//         name: 'UP DORM',
//         landmarks: [ 'Oblation', 'CAS Building' ],
//         address: {
//             postCode: '1111',
//             street: 'Kalsada street',
//             barangay: 'Batong Malake',
//             city: 'Los Banos',
//             province: 'Laguna',
//             region: 'Region IV'
//         },
//         generalLocation: 12345,
//         accommodationType: 'Dorm',
//         amenities: [ 'Toiletries' ],
//         // priceRange: {
//         //     minPrice: 2000,
//         //     maxPrice: 5000
//         // },
//         priceRange: 5000,
//         description: 'Available to all UP Students',
//         photos: [ 'Photo 1', 'Photo 2' ],
//         // restrictions: {     
//         //     curfew: 'Yes',
//         //     pets: 'Not Allowed',
//         //     cooking: 'Not Allowed',
//         //     visitors: 'Not Allowed',
//         //     coedStatus: 'No',
//         //     wifi: 'With WiFi',
//         //     phoneSignal: 'Fair'
//         // },
//         restrictions: ["No curfew", "with WiFi"],
//         security: 'Very Secure',
//         archived: false
//     },
//     (err, res) => {
//         console.log(res.body)
//     }
// )



// needle.get("http://localhost:3001/viewAccomm", 
//     {
//         _id: "random"
//     },
//     (err, res) => {
//         console.log(res.body.result);
//     }
// )

// ========================== SEARCH ACCOMMODATION ==========================
// needle.post("http://localhost:3001/searchAccomm",
//     {
//         searchString: "bar"
//     },
//     (err, res) => {
//         console.log(res.body.result);
//     }
// );

// ========================== DELETE ACCOMMODATION ==========================
// needle.delete("http://localhost:3001/deleteAccomm",
//     {
//         _id: "6437c2d8b74cee2c7bfbc15f"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// ========================== BOOKMARK ACCOMMODATION ==========================
// needle.post("http://localhost:3001/bookmarkAccomm",
//     {
//         user_id:"6443c48421c7c8144ab343e6",
//         accomm_id: "6443d98319888d78cbbc271f"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );


// ========================== GENERATE PDF ==========================
// needle.post("http://localhost:3001/generateRep",
//     {
//         _id:"6443c48421c7c8144ab343e6"
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );
