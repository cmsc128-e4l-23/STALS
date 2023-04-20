import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes.js";
import cookieParser from "cookie-parser";
import easytest from "./test/easytest.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type");
    res.setHeader("Access-Control-Allow-Credentials","true");
    next();
});

app.use(cookieParser());
app.use(routes);

/* DB SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
}).catch((error) => console.log(`${error} DID NOT CONNECT`));

// include the testing here

await easytest.clearDatabase();
await easytest.populateDatabase();

// mongoose.connect(
//     "mongodb://localhost:27017/users",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err) => {
//       if (err) { console.log(err); }
//       else { console.log("Successfully connected to Mongo DB"); }
//     }
//   )