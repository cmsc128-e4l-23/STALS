import mongoose from "mongoose";

export default async function makeDB(mongourl){
    return mongoose.connect(mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("connected to database"))
}