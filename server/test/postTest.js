import needle from "needle";

// const url = "http://localhost:3001/addAccomm";
// const data = { name: "John Doe", email: "johndoe@example.com"};

// needle.post(url, data, {json: true}, (err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(body);
//     }
// });


needle.post("http://localhost:3001/login",
    {
        userType: "Student",
        firstName: "Drey",
        lastName: "Tuazon",
        email: "dreytuaz@gmail.com",
        password: "$2b$10$i26n2rL7/mf//kiJ.w4L4OqMGvxY0fTvS7k1LBSCfTr4zeSaQaZfa",
        phoneNumber: "09999999"
    },
    (err, res) =>{
        // console.log(res.body);
    }
);