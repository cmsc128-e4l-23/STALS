import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// /* DB SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
}).catch((error) => console.log(`${error} DID NOT CONNECT`));

/* ROUTES */
app.use(routes);

/* SERVER START */
app.listen(process.env.PORT, (err) => {
    if (err){ console.log(err); }
    else { console.log ("Server listening at port", process.env.PORT); }
});