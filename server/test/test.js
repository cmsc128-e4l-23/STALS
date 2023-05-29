import needle from "needle";
import mongoose from "mongoose";

const signup_details1 = {
    userType: "Teacher",
    firstName: "Player 1",
    lastName: "Blank",
    email: "p1blank@up.edu.ph",
    password: "player1blank",
    phoneNumber: "09123456789",
    birthday: "2002-05-07",
    sex: "Male"
}

const signup_details2 = {
    userType: "Teacher",
    firstName: "Player 2",
    lastName: "Sora",
    email: "p2sora@up.edu.ph",
    password: "player2sora",
    phoneNumber: "09876543210",
    birthday: "2002-05-07",
    sex: "Male"
}

const signup_details3 = {
    userType: "Student",
    firstName: "Player 3",
    lastName: "Shiro",
    email: "p3shiro@up.edu.ph",
    password: "player3shiro",
    phoneNumber: "09753126480",
    birthday: "2002-05-07",
    sex: "Female"
}

var accomm_details1 = {
    name: "White House",
    owner: "p1blank@up.edu.ph",
    landmarks: ["Raymundo Gate"],
    address: {
      postCode: "1234",
      street: "Street 10",
      barangay: "Barangay 11",
      city: "City 12",
      province: "Laguna",
      region: "CALABARZON"
    },
    generalLocation: 1,
    accommodationType: "Transient",
    amenities: "Free Wi-Fi",
    priceRange: {
      minPrice: 5000,
      maxPrice: 10000
    },
    description: "A place to stay at!",
    photos: [],
    restrictions: ["no visitors allowed"]
};

var accomm_details2 = {
    name: "The House",
    owner: "p3shiro@up.edu.ph",
    landmarks: ["Raymundo Gate"],
    address: {
      postCode: "2234",
      street: "Street 11",
      barangay: "Barangay 11",
      city: "City 12",
      province: "Laguna",
      region: "CALABARZON"
    },
    generalLocation: 1,
    accommodationType: "Transient",
    amenities: "Free Wi-Fi",
    priceRange: {
      minPrice: 5000,
      maxPrice: 10000
    },
    description: "A place to stay at!",
    photos: [],
    restrictions: ["no visitors allowed"]
};

let url = "http://localhost:3001/signup";

// needle.post(url, signup_details1, {json: true}, (err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(body);
//     }
// });

// needle.post(url, signup_details2, {json: true}, (err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(body);
//     }
// });

// needle.post(url, signup_details3, {json: true}, (err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(body);
//     }
// });

needle.post(url, signup_details4, {json: true}, (err, res, body) => {
    if (err) {
        console.error(err);
    } else {
        console.log(body);
    }
});

url = "http://localhost:3001/addAccomm";

// needle.post(url, accomm_details1, { json: true }, (err, res, body) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(body);
//     }
//   });

//   needle.post(url, accomm_details2, { json: true }, (err, res, body) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(body);
//     }
//   });