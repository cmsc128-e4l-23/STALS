import mongoose from "mongoose";

export default async function makeDB(mongourl){
    return mongoose.connect(mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(`Database Connection Error: ${err}`))
}