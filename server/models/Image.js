import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({
	userId: {
		type : mongoose.SchemaTypes.ObjectId,
        ref : "User",
        required : true
	},
	attachedTo: {
		type : mongoose.SchemaTypes.ObjectId,
        ref : "Accommodation"
	},
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
