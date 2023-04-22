import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Review from "../models/Review.js";

// Used to add reviews
// Throws error if user is not found
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
        if (user){
            user.reviews.push(savedReview._id);
            await user.save();

            res.send({ success: true, message: "Successfully added new review" });
        } else {
            throw new Error("User not found");
        }
        
    } catch (err){
        console.log(err);
        res.status(500).json({error: err.message})
    }

}

// Used for editing already made reviews
// Throws an error if review does not exist
const editReview = async (req, res) => {
    const review_details = req.body;
    let updateObject = { $set: {} };

    if (req.body.content){
        updateObject.$set.content = req.body.content;
    }
    if (req.body.rating){
        updateObject.$set.rating = req.body.rating;
    }
    if (req.body.photos){
        updateObject.$set.photos = req.body.photos;
    }

    try{
        const result = await Review.findByIdAndUpdate(
            review_details._id,
            updateObject
        );

        if (result){
            res.send({ success: true, message: "Successfully edited review" });
        } else {
            throw new Error("Review not found");
        }
    } catch (error){
        console.log(error);
        res.send({ success: false, message: "Failed to edit review", error: error });
    }
}

// Deletes an existing review and also deletes it from the user's
// review list
// Throws an error if review or user if user is not found
const deleteReview = async (req, res) => {
    const review_details = req.body;
    const userId = req.body.userId;

    try{
        //Deleting review
        const result = await Review.findByIdAndDelete(review_details._id);

        if (result){
            //Deleting review from the user
            const user = await User.findById(userId)
            if (user){
                user.reviews.pull(review_details._id);
                await user.save();

                res.send({ success: true, message: "Successfully deleted review" });
            } else {
                throw new Error("User not found");
            }   
        } else {
            throw new Error("Review not found");
        }
    } catch (error){
        console.log(error);
        res.send({ success: false, message: "Failed to delete review", error: error });
    }

}

// returns all reviews of a given user or a property
// returns empty array if no reviews were found
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