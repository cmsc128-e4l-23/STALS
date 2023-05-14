import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    numVisits : {
        type: Number,
        required: true
    }
})

const Visit = mongoose.model('Visit', visitSchema);
export default Visit;