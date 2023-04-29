//author: Pineda, Brixter Sien M.

import mongoose from "mongoose";

//mongoose.connect("")

const reviewSchema = new mongoose.Schema({
	userId: {
		type : mongoose.SchemaTypes.ObjectId,
        ref : "User",
        required : true
	},
	propertyId: {
		type : mongoose.SchemaTypes.ObjectId,
        ref : "Accommodation",
        required : true
	},
	content: {
		type: String, 
		required: true
	},
	rating: {
		type: Number, 
		required: true
	},
	photos: [{
		filename: {type: String}
	}]
})

const Review = mongoose.model("Review", reviewSchema);

