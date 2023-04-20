import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Review from "../models/Review.js";

const addReview = async (req, res) => {
    try{
        const review_details = req.body;

        const userId = review_details.userId;
        const propertyId = review_details.propertyId;
        const content = review_details.content;
        const rating = review_details.rating;
        const photos = review_details.photos;
        
        //Creating new review
        const newReview = new Review({
            userId: userId,
            propertyId: propertyId,
            content: content,
            rating: rating,
            photos: photos
        });
        const savedReview = await newReview.save();

        //Adding the newly created review to current user
        const user = await User.findById(userId);
        user.reviews.push(savedReview._id);
        await user.save();
        
        res.send({ success: true, message: "Successfully added new review" });
        res.status(201).json(savedReview);
    } catch (err){
        console.log(err);
        res.status(500).json({error: err.message})
    }

}

//Used for editing already made reviews
const editReview = async (req, res) => {
    const review_details = req.body;
    let updateObject = { $set: {} };

    if (req.body.content){
        updateObject.$set.content = req.body.content;
    }
    if (req.body.rating){
        updateObject.$set.content = req.body.rating;
    }
    if (req.body.photos){
        updateObject.$set.photos = req.body.photos;
    }

    console.log("updateObject = ", updateObject);
    try{
        await Review.findByIdAndUpdate(
            review_details._id,
            updateObject
        );
        res.send({ success: true, message: "Successfully edited review" });
    } catch (error){
        console.log(error);
        res.send({ success: false, error: "Failed to edit review" });
    }
    
}

const deleteReview = async (req, res) => {
    const review_details = req.body;
    const userId = req.body.userId;

    try{
        //Deleting review
        await Accommodation.deleteOne({ _id: review_details._id });
        
        //Deleting review from the user
        const user = await User.findById(userId)
        user.reviews.pull(review_details._id);
        await user.save();
        
        res.send({ success: true, message: "Successfully deleted review" });
    } catch (error){
        console.log(error);
        res.send({ success: false, error: "Failed to delete review" });
    }

}

const getReview = async (req, res) => {

    let queryObject;

    if (req.body.userId){
        queryObject = { userId: req.body.userId };
    } else if (req.body.propertyId){
        queryObject = { propertyId: req.body.propertyId };
    }

    try{
        const result = await Review.find(queryObject);
        res.send({ success: true, result: result });
    } catch(error) {
        res.send({ success: false, error: error });
    }
}

export default {
    addReview,
    editReview,
    deleteReview,
    getReview
}