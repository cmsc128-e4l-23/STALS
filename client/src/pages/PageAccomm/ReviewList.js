import React from "react";
import "./ReviewList.css";
import ReviewBody from "./ReviewBody";

export default function ReviewList({ reviews }){

    return(
        <>
            <h1 className="review-title">Reviews</h1>
            {
                reviews.length === 0 ? <h2 className="no-reviews">No Reviews</h2> :
                reviews.map((review) => 
                    <div className="">
                        <ReviewBody reviewId={review}/>
                    </div>)
            }
        </>
    )
}