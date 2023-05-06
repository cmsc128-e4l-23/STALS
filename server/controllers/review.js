import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Review from "../models/Review.js";

// Used to add reviews
// Throws error if user is not found
const addReview = async (req, res) => {
    const review_details = req.body;

    User.findOne({ email: review_details.user })
        .then(async (document) => {
            if (!document) {
                throw "User not found!";
            }

            //Creating new review
            const newReview = new Review({
                userId: document._id,
                propertyId: review_details.propertyId,
                content: review_details.content,
                rating: review_details.rating,
                photos: review_details.photos
            });
            const savedReview = await newReview.save();

            //Adding the newly created review to current user and to the accommodation
            const user = await User.findById(document._id);
            const accomm = await Accommodation.findById(review_details.propertyId);

            if (user && accomm) {
                user.reviews.push(savedReview._id);
                accomm.reviews.push(savedReview._id);
                await user.save();
                await accomm.save();

                res.send({ success: true, msg: "Successfully added new review" });
            } else {
                if (!user) throw "User not found";
                if (!accomm) throw "Accommodation not found";
            }

        }).catch((err) => {
            res.send({ success: false, msg: err });
        })
}

// Used for editing already made reviews
// Throws an error if review does not exist
const editReview = async (req, res) => {
    const review_details = req.body;
    let updateObject = { $set: {} };

    if (review_details.content) updateObject.$set.content = review_details.content;
    if (review_details.rating) updateObject.$set.rating = review_details.rating;
    if (review_details.photos) updateObject.$set.photos = review_details.photos;

    try {
        const result = await Review.findByIdAndUpdate(
            review_details._id,
            updateObject
        );

        if (result) {
            res.send({ success: true, msg: "Successfully edited review" });
        } else {
            throw new Error("Review not found");
        }

    } catch (err) {
        res.send({ success: false, msg: err });
    }
}

// Deletes an existing review and also deletes it from the user's
// review list
// Throws an error if review or user if user is not found
const deleteReview = async (req, res) => {
    const review_details = req.body;

    try {
        //Deleting review
        const doc = await Review.findById(review_details._id);

        if (doc) {
            //Deleting review from the user and the accommodation
            const user = await User.findById(review_details.userId);
            const accomm = await Accommodation.findById(review_details.propertyId);
            // the user should also match the 

            if (user && accomm && doc.userId.equals(user._id) && doc.propertyId.equals(accomm._id)) {
                user.reviews.pull(review_details._id);
                accomm.reviews.pull(review_details._id);
                await user.save();
                await accomm.save();
                // finally delete the doc review
                await Review.deleteOne({ _id: doc._id });
                res.send({ success: true, msg: "Successfully deleted review" });
            } else {
                if (!user) throw new Error("User not found");
                if (!accomm) throw new Error("Accommodation not found");
                // for additional security measures
                if (!doc.userId.equals(user._id)) throw new Error("User id mismatch! Report found but incorrect userId");
                if (!doc.propertyId.equals(accomm._id)) throw new Error("Accomm id mismatch! Report found but incorrect propertyId");

            }
        } else {
            throw new Error("Review not found");
        }
    } catch (err) {
        res.send({ success: false, msg: err });
    }
}

// returns all reviews of a given user or a property
// returns empty array if no reviews were found
const getReview = async (req, res) => {

    let queryObject;

    if (req.body.userId) {
        queryObject = { userId: req.body.userId };
    } else if (req.body.propertyId) {
        queryObject = { propertyId: req.body.propertyId };
    }

    try {
        const result = await Review.find(queryObject);
        res.send({ success: true, result: result });
    } catch (error) {
        res.send({ success: false, error: error });
    }
}

export default {
    addReview,
    editReview,
    deleteReview,
    getReview
}