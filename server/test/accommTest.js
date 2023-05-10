import needle from "needle";
import mongoose from "mongoose";

// assuming that we still use the same dump

let url;

// SEARCH ACCOMMODATION
url = "http://localhost:3001/searchAccomm";

// testing the name
//post("Name Test", url, {searchString: "Beautiful Villa"})
// test the post code
//post("Post Code Test", url, {searchString: "6666"})
// multiple returns
//post("Multiple Returns", url, {searchString: "Barangay 11"})
// misspelling
//post("Misspelling", url, {searchString: "Lanuga"})
// we'll assume that blank strings couldn't be inputted

// test('Accommodation Name Searching', () => {
//     return needle.post(url, {searchString: "Beautiful Villa"},
//     (err, res) => {
//         expect(res.body.success).toBe(true);
//         // only get the ids
//         expect(res.body.result._id).toBe('644ce1aad31be0a75c33df74');
//     })
// })

// ========================== ADD ACCOMMODATION ==========================
url = "http://localhost:3001/addAccomm";
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

// Example 4
// const accommodation4 = {
//     name: "Luxury Condo",
//     landmarks: ["Near the shopping mall"],
//     address: {
//       postCode: "1634",
//       street: "101 Orchard Road",
//       barangay: "Barangay 4",
//       city: "Makati",
//       province: "Metro Manila",
//       region: "NCR"
//     },
//     generalLocation: 5,
//     accommodationType: "Rent",
//     amenities: ["Swimming pool", "Gym", "Parking"],
//     priceRange: {
//               minPrice: 5000,
//               maxPrice: 10000
//             },
//     description: "Experience luxury living in our condo near the shopping mall",
//     photos: ["condo.jpg"],
//     restrictions: ["No parties allowed"],
//     security: "24-hour security"
//   };
  
//   // Example 1
//   const accommodation1 = {
//     name: "Beautiful Villa",
//     landmarks: ["Near the beach"],
//     address: {
//       postCode: "4026",
//       street: "123 Beach Road",
//       barangay: "Barangay 1",
//       city: "Santa Rosa",
//       province: "Laguna",
//       region: "CALABARZON"
//     },
//     generalLocation: 4,
//     accommodationType: "Dorm",
//     amenities: ["Swimming pool", "Free Wi-Fi"],
//     priceRange: {
//         minPrice: 1500,
//         maxPrice: 10000
//       },
//     description: "Stay in our beautiful villa by the beach",
//     photos: ["beach.jpg", "pool.jpg"],
//     restrictions: ["No pets allowed"],
//     security: "24-hour security"
//   };
  
//   // Example 2
//   const accommodation2 = {
//     name: "Cozy Apartment",
//     landmarks: ["Near the train station"],
//     address: {
//       postCode: "1001",
//       street: "456 Main Street",
//       barangay: "Barangay 2",
//       city: "Manila",
//       province: "Metro Manila",
//       region: "NCR"
//     },
//     generalLocation: 5,
//     accommodationType: "Rent",
//     amenities: ["Gym", "Parking"],
//     priceRange: {
//         minPrice: 2000,
//         maxPrice: 10000
//       },
//     description: "Our cozy apartment is perfect for short-term rentals",
//     photos: ["apartment.jpg"],
//     restrictions: ["No smoking"],
//     security: "CCTV monitoring"
//   };
  
//   // Example 3
//   const accommodation3 = {
//     name: "Budget Inn",
//     landmarks: ["Near the bus station"],
//     address: {
//       postCode: "6000",
//       street: "789 Main Street",
//       barangay: "Barangay 3",
//       city: "Cebu City",
//       province: "Cebu",
//       region: "Central Visayas"
//     },
//     generalLocation: 3,
//     accommodationType: "Transient",
//     amenities: ["Air-conditioning", "Hot shower"],
//     priceRange: {
//         minPrice: 800,
//         maxPrice: 1000
//       },
//     description: "Stay in our budget inn for a comfortable and affordable stay",
//     photos: ["inn.jpg"],
//     restrictions: ["No loud music after 10pm"],
//     security: "Safe and secure"
//   };



// needle.post(url, accommodation4, { json: true }, (err, res, body) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(body);
//   }
// });

// needle.post(url, accommodation3, { json: true }, (err, res, body) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(body);
//     }
//   });

//   needle.post(url, accommodation2, { json: true }, (err, res, body) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(body);
//     }
//   });

//   needle.post(url, accommodation1, { json: true }, (err, res, body) => {
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

// edit 2 (half requirements)
// needle.post("http://localhost:3001/editAccomm",
//     {
//         _id: '643665dccee7fa1d7dd408ea',
//         name: 'UP TRANSIENT HOUSE',
//         landmarks: [ 'Oblation', 'CAS Building' ],
//         address: {
//             postCode: '1234',
//             street: 'New Kalsada Street',
//             region: "CALABARZON"
//         },
//         generalLocation: 12345,
//         accommodationType: 'Transient',
//         priceRange: {
//             maxPrice: 4000
//         },
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


// edit 4 (original edit)
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
//         priceRange: {
//             minPrice: 2000,
//             maxPrice: 5000
//         },
//         // priceRange: 5000,
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

//========================== BOOKMARK ACCOMMODATION ==========================
//user1 = "644cd8a4dad90ff1fc7d1513"
//user2 = "644cd8a4dad90ff1fc7d1511"
//user3 = "644cd8a4dad90ff1fc7d150f"
//accomm1 = "644cdb964c5e0d977fa685ac"
//accomm2= "644cdb964c5e0d977fa685af"
//accomm3 = "644cdb964c5e0d977fa685b2"
// needle.post("http://localhost:3001/bookmarkAccomm",
//     {
//         user_id: user1,
//         accomm_id: accomm1
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post("http://localhost:3001/removeBookmarkAccomm",
//     {
//         user_id: user1,
//         accomm_id: accomm1
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
// needle.post("http://localhost:3001/recommendAccomm",
//     {
//        returnLength: 3,
//        accommLength: 10,
//     //    searchLocs: 'Laguna',
//     //    searchType: 'Transient',
//        minPrice: 0,
//        maxPrice: 200

//     },
//     (err, res) => {
//         console.log(res.body.result);
//     }
// );
