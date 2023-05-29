import React, { useState, useEffect } from "react";
import { Rating, Box } from "@mui/material";
import './AccommBody.css'
export default function ReviewBody({ reviewId }){
    const [review, setReview] = useState(null);
    const [user, setUser] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/getReview?id=" + reviewId, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(body => {
            if (body.success) {
                setReview(body.review)
                setUser(body.user);
            }
        })
        .catch((error) => {
            alert(error);
        })
}, [reviewId])

        

    return(
        <>
        {
            review ?
            <div className='review-container'>
                <div className='review-header'>
                    <label>{user}</label>
                    <div className="rating">
                        <Rating precision={.5} defaultValue={review.rating}  readOnly/>
                        <Box sx={{ ml: 1 }}>{review.rating.toFixed(1)}</Box>
                    </div>
                </div>
                <p className="review-body">
                    {review.content}
                </p>
            </div>
            :
            <></>
        }
        </>
    )
}