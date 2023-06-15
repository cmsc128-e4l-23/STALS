import React from "react";
import "./ReviewList.css";
import ReviewBody from "./ReviewBody";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ReviewList({ reviews }){
    const [seeReview, setSeeReview] = React.useState(false)

    return(
        <>
            <h1 className="review-title">Reviews</h1>
            {
                reviews.length === 0 ? <h2 className="no-reviews">No Reviews</h2> : 
                reviews.length < 3 ?
                reviews.map((review) => 
                    <div className="show-review">
                        <ReviewBody reviewId={review}/>
                    </div>)
                :
                <div>
                {reviews.slice(0,2).map((review, index) =>
                    <div className="show-review">
                        <ReviewBody reviewId={review}/>
                    </div>
                )}
                <button className="see-all-review" onClick={() => {setSeeReview(true)}}>See All {reviews.length} Reviews</button>
                <Dialog
                    open={seeReview}
                    onClose={() => {setSeeReview(false)}}
                    aria-labelledby="see-review-dialog-title"
                    aria-describedby="see-review-dialog-description"
                >
                    <DialogTitle id="see-review-dialog-title">
                        {"All Reviews"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="see-review-dialog-description">
                            {reviews.map((review) => 
                            <div className="">
                                <ReviewBody reviewId={review}/>
                            </div>)}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                </div>
            }
        </>
    )
}