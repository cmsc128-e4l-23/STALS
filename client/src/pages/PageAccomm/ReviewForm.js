import './AccommBody.css';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    TextField, 
    Button, 
    DialogActions, 
    Rating, 
    Typography 
    } from '@mui/material';

export default function ReviewForm({ accommId, email, userType, isLoggedIn }){
    const [dialogOpen, setDialogOpen] = useState(false)
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(5)
    
    const submitReview = () => {
        let newReview = {
            user: email,
            propertyId: accommId,
            content: content,
            rating: rating,
        }
        fetch(process.env.REACT_APP_API + 'addReview', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.success){
                alert(data.msg)

            }else{
                alert(data.error)
            }
            setDialogOpen(false)
        })
    }

    const openDialog = () => {
        if(!isLoggedIn) alert("Log in required to make a review.")

        else if(userType === "Accommodation Owner")
            alert("Accommodation owners are not allowed to make reviews.")

        else if(userType === "Admin")
            alert("Site Administrators are not allowed to make reviews.")
        
        else setDialogOpen(true)
    }

    return(
        <>
            <button className="report-button" onClick={openDialog} hidden={userType==="Admin"}><FaStar /> Review this listing</button>
            <Dialog open={dialogOpen} onClose={() => {setDialogOpen(false)}}>
                <DialogTitle padding={5} lineHeight={.5}><h2>Review an accommodation</h2></DialogTitle>
                <DialogContent>
                    <Typography variant="button" gutterBottom={true}>Rating: </Typography>
                    <br/>
                    <Rating 
                        size="size-medium" 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                        precision={0.5}    
                    />
                    <br/>
                    <br/>
                    <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Review Details"
                    multiline
                    maxRows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                    
                </DialogContent>
                <DialogActions>
                        <Button onClick={() => {setDialogOpen(false)}}>Cancel</Button>
                        <Button onClick={submitReview}>Review</Button>
                </DialogActions>
            </Dialog>
        </>
        
    )
}