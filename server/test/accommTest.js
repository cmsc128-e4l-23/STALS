import needle from "needle";
import mongoose from "mongoose";

// ========================== ADD ACCOMMODATION ==========================
// const url = "http://localhost:3001/addAccomm";
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

// ========================== SEARCH ACCOMMODATION ==========================
// needle.post("http://localhost:3001/searchAccomm",
//     {
//         searchString: "San Tomas"
//     },
//     (err, res) => {
//         console.log(res.body.result[0].address);
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


// ========================== GENERATE PDF ==========================
needle.post("http://localhost:3001/generateRep",
    {
        _id:"64426244d48c880b102fdf2c"
    },
    (err, res) => {
        console.log(res.body);
    }
);
