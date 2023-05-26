import { useState, useEffect } from "react";

export default function ReviewList({ accommId }){
    const [reviews, setReviews] = useState([]);

    return(
        <>
            {
                reviews.length === 0 ? <h1>No Reviews</h1> :
                reviews.map((review, id) => <div>Review #{id}</div>)
            }
        </>
    )
}