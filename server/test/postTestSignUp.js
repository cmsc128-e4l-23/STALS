import needle from "needle";

const url = "http://localhost:3001/register";
const data = { userType: "Student", firstName: "First", 
               lastName: "Last", email: "firstlast@gmail.com", password: "pass123", phoneNumber: "09123456781"};

needle.post(url, data, {json: true}, (err, res, body) => {
    if (err) {
        console.error(err);
    } else {
        console.log(body);
    }
});