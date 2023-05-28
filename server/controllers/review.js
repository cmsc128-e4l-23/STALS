import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Review from "../models/Review.js";

//add review functionality
//req.body is an object that should have:
//     user: #email of the user#,
//     propertyId: #id of property/accomm#,
//     content: #review content#,
//     rating: #rating for accommodation (0-5)#,
//     photos: #photos related to review (optional#

//A successful search will result to a res.body that contains
//  - a key "success" with a value true
//  - a key msg with string Successfully added new review

//A unsuccessful search will result to a res.body that contains
//  - a key "success" with a value false
//  - a key msg with a value of the error encountered
const addReview = async (req, res) => {
    const review_details = req.body;

    User.findOne({ email: review_details.user })
        .then(async (user) => {

            if (!user) throw new Error("User not found");

            //finds the accomm
            const accomm = await Accommodation.findById(review_details.propertyId);

            if (user && accomm) {
                //Creating new review
                if (!accomm.owner.equals(user._id)) {
                    const newReview = new Review({
                        userId: user._id,
                        propertyId: review_details.propertyId,
                        content: review_details.content,
                        rating: review_details.rating,
                        photos: review_details.photos
                    });
                    const savedReview = await newReview.save();

                    //Adding the newly created review to current user and to the accommodation
                    user.reviews.push(savedReview._id);
                    accomm.reviews.push(savedReview._id);
                    await user.save();
                    await accomm.save();

                    res.send({ success: true, msg: "Successfully added new review" });
                } else throw new Error("Owner cannot review own accommodation");

            } else {
                if (!accomm) throw new Error("Accommodation not found");
            }

        }).catch((err) => {
            res.send({ success: false, msg: "Adding new review Failed", error: err.message });
        })
}

//edit review functionality
//req.body is an object that should have:
//     _id: #id of review#,
//     content: #review content (optional)#,
//     rating: #rating for accommodation (0-5) (optional)#,
//     photos: #photos related to review (optional)#

//A successful search will result to a res.body that contains
//  - a key "success" with a value true
//  - a key msg with string Successfully edited review

//A unsuccessful search will result to a res.body that contains
//  - a key "success" with a value false
//  - a key msg with a value of the error encountered
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

        if (result) res.send({ success: true, msg: "Successfully edited review" });
        else throw new Error("Review not found");

    } catch (err) {
        res.send({ success: false, msg: "Editing review failed", error: err.message });

    }
}

//delete review functionality - Deletes an existing review as well as user's copy
//req.body is an object that should have:
//     _id: #id of review#,
//     user: #email of the user#,
//     propertyId: #id of property/accomm#,

//A successful search will result to a res.body that contains
//  - a key "success" with a value true
//  - a key msg with string Successfully deleted review

//A unsuccessful search will result to a res.body that contains
//  - a key "success" with a value false
//  - a key msg with a value of the error encountered
const deleteReview = async (req, res) => {
    const review_details = req.body;

    try {
        //Deleting review
        const doc = await Review.findById(review_details._id);

        if (doc) {
            //Deleting review from the user and the accommodation
            const user = await User.findOne({ email: review_details.user });
            const accomm = await Accommodation.findById(review_details.propertyId);

            // the user should also match
            try {
                if (user && accomm && doc.userId.equals(user._id) && doc.propertyId.equals(accomm._id)) {
                    user.reviews.pull(review_details._id);
                    accomm.reviews.pull(review_details._id);
                    await user.save();
                    await accomm.save();
                    // finally delete the doc review
                    await Review.deleteOne({ _id: doc._id });
                    res.send({ success: true, msg: "Successfully deleted review" });
                } else {
                    // for additional security measures
                    if (!doc.user.equals(user.email)) throw new Error("User id mismatch! Report found but incorrect userId");
                    if (!doc.propertyId.equals(accomm._id)) throw new Error("Accomm id mismatch! Report found but incorrect propertyId");
                }
            } catch (err) { throw new Error("Accomodation/User not found"); }
        } else throw new Error("Review not found");
    } catch (err) {
        res.send({ success: false, msg: "Deleting review failed", error: err.message });
    }
}

const getReview = async (req, res) => {
    const reviewId = req.query.id
    
    try {
        let review = await Review.findById(reviewId);

        if(review){
            let user = await User.findById(review.userId);
            res.send({ 
                success: true, 
                msg: "Review retrieved successfully", 
                review: review, 
                user: user.firstName + " " + user.lastName 
            });
        }
    } catch(err) {
        res.send({ success: false, msg: "Failed to get review", error: err.message })
    }
}

export default {
    addReview,
    editReview,
    deleteReview,
    getReview
}