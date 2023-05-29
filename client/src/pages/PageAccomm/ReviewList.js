import React from "react";
import ReviewBody from "./ReviewBody";

export default function ReviewList({ reviews }){

    return(
        <>
            <h1>Reviews</h1>
            {
                reviews.length === 0 ? <h2>No Reviews</h2> :
                reviews.map((review) => <div><ReviewBody reviewId={review}/></div>)
            }
        </>
    )
}