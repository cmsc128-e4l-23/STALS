// Calma, Coleen G.
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User",
        required : true
    },
    reported : {                                    // id of owner or accommodation reported by user
        type : mongoose.SchemaTypes.ObjectId,
        refPath: 'classification',
        required : true
    },
    classification : {                              // classification
        type : String,
        enum : ['Accommodation', 'User'],
        required : true
    },
    content : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['Resolved', 'Pending'],
        default : 'Pending',
        required: true
    }
});

const Report = mongoose.model('Report', reportSchema);
export default Report;