import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/* DB SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
}).catch((error) => console.log(`${error} DID NOT CONNECT`));