import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes.js";
import cookieParser from "cookie-parser";

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



// /* DB SETUP */
const PORT = 6001;
mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`DB SERVER PORT: ${PORT}`));
}).catch((error) => console.log(`${error} DID NOT CONNECT`));

/* ROUTES */
app.use(routes);

/* SERVER START */
app.listen(3001, (err) => {
    if (err){ console.log(err); }
    else { console.log ("Server listening at port", 3001); }
});