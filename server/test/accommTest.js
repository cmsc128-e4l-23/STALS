import needle from "needle";
import mongoose from "mongoose";

// ========================== ADD ACCOMMODATION ==========================
const url = "http://localhost:3001/addAccomm";
// const newAccommodation1 = {
//     accommodationID: new mongoose.Types.ObjectId(),
//     name: "A Place to Stay At Home",
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

// const newAccommodation2 = {
//     accommodationID: new mongoose.Types.ObjectId(),
//     name: "A Place to Stay At Mall",
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
//       wifi: "With WiFi"
//     }
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

// fetched from test-cases branch
// const data = [
//     {
//         accommodationID: new mongoose.Types.ObjectId(),
//         name: "Nawawalang Paraiso",
//         address: {
//             postCode: "4030",
//             street: "Dos Lagos",
//             barangay: "San Fernando",
//             city: "Los Baños",
//             province: "Laguna",
//             region: "CALABARZON"
//         },
//         accommodationType: 'Transient',
//         priceRange: {
//             minPrice: 7000,
//             maxPrice: 14000
//         },
//         description: "Lost Paradise",
//         restrictions: ['No drugs allowed',],
//         reviews: [],
//     },
//     {
//         accommodationID: new mongoose.Types.ObjectId(),
//         name: "Four Sisters",
//         address: {
//             postCode: "4030",
//             street: "Magsaysay",
//             barangay: "Putimbakal",
//             city: "Los Baños",
//             province: "Laguna",
//             region: "CALABARZON"
//         },
//         accommodationType: 'Dorm',
//         priceRange: {
//             minPrice: 2400,
//             maxPrice: 3700
//         },
//         description: "Affordable dorms for students",
//         restrictions: ['No cooking allowed inside',],
//         reviews: [],
//     },
//     {
//         accommodationID: new mongoose.Types.ObjectId(),
//         name: "Mayfair Apartments",
//         address: {
//             postCode: "1234",
//             street: "Apolinario",
//             barangay: "Mabini",
//             city: "Quezon",
//             province: "NCR",
//             region: "NCR"
//         },
//         accommodationType: 'Dorm',
//         priceRange: {
//             minPrice: 5000,
//             maxPrice: 7000
//         },
//         description: "Transient, just like home!",
//         restrictions: ['Help thy landlord harvest wheat for thou art a peasant',],
//         reviews: [],
//     },
//     {
//         accommodationID: new mongoose.Types.ObjectId(),
//         name: "100% very VERY GOOD rentspACe NO CAP frfr :OOOOO!!1!!",
//         address: {
//             postCode: "6666",
//             street: "Maligaya",
//             barangay: "HappyLand",
//             city: "Makati",
//             province: "NCR",
//             region: "NCR"
//         },
//         accommodationType: 'Rent',
//         priceRange: {
//             minPrice: 0,
//             maxPrice: 100
//         },
//         description: "Definitely safe :)",
//         restrictions: ['Nothing... just nothing :)))',],
//         reviews: [],
//     },
// ]
// for (let d of data) {
//     needle.post(url, d, { json: true }, (err, res, body) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(body);
//     }
//   });
// }

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

// ========================== GET RECOMMENDATIONS ==========================
needle.post("http://localhost:3001/recommendAccomm",
    {
       searchString: "lorem ipsum",
       returnLength: 3,
       accommLength: 11,
    },
    (err, res) => {
        console.log(res.body);
    }
);
