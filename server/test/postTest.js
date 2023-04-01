import needle from "needle";

const url = "http://localhost:3001/addAccomm";
const data = { name: "John Doe", email: "johndoe@example.com"};

needle.post(url, data, {json: true}, (err, res, body) => {
    if (err) {
        console.error(err);
    } else {
        console.log(body);
    }
});