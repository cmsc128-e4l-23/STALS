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

        // additional checking
        // I am not sure whether rating is a float or integer
        if (rating < 0 || rating > 5) throw new Error("Invalid Rating Range");
        // let's assume that content length shouldn't be that long
        if (content.length > 2000) throw new Error("Content shouldn't exceed 2000 characters")
        
        //Creating new review
        const newReview = new Review({
            userId: userId,
            propertyId: propertyId,
            content: content,
            rating: rating,
            photos: photos
        });
        const savedReview = await newReview.save();

        //Adding the newly created review to current user and to the accommodation
        const user = await User.findById(userId);
        const accomm = await Accommodation.findById(propertyId);
        
        if (user && accomm){
            user.reviews.push(savedReview._id);
            accomm.reviews.push(savedReview._id);
            await user.save();
            await accomm.save();

            res.send({ success: true, message: "Successfully added new review" });
        } else {
            if (!user) throw new Error("User not found");
            if (!accomm) throw new Error("Accommodation not found");
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

    if (review_details.content){
        updateObject.$set.content = review_details.content;
    }
    if (review_details.rating){
        updateObject.$set.rating = review_details.rating;
    }
    if (review_details.photos){
        updateObject.$set.photos = review_details.photos;
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
    const id = review_details._id;
    const userId = review_details.userId;
    const propertyId = review_details.propertyId;

    try{
        //Deleting review
        const result = await Review.findById(id);

        if (result){
            //Deleting review from the user and the accommodation
            const user = await User.findById(userId);
            const accomm = await Accommodation.findById(propertyId);
            // the user should also match the 
            if (user._id == result.userId && accomm._id == result.propertyId){
                user.reviews.pull(id);
                accomm.reviews.pull(id);
                await user.save();
                await accomm.save();
                // finally delete the result
                await User.deteteOne({_id: result._id});

                res.send({ success: true, message: "Successfully deleted review" });
            } else {
                if (!user) throw new Error("User not found");
                if (!accomm) throw new Error("Accommodation not found");
                if (user._id != result.userId) throw new Error("User id mismatch! Report found but incorrect userId");
                if (accomm._id != result.propertyId) throw new Error("Property / Accomm id mismatch! Report found but incorrect propertyId");
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