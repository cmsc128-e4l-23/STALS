import app from './app.js';
import dotenv from 'dotenv';
import makeDB from "./mongoose.js";

/* DB SETUP */
dotenv.config({path:'.env'}); //dotenv.config();
const port = process.env.PORT || 6001;

makeDB(process.env.MONGO_URL).then(() => app.listen(port, () => console.log(`SERVER PORT: ${port}`)))
