import './AccommBody.css'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function ReviewForm({ accommId }){
    const [dialogOpen, setDialogOpen] = useState(false)
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(0)
    
    const submitReview = () => {
        let newReview = {
            user: localStorage.getItem("email"),
            propertyId: accommId,
            content: content,
            rating: rating,
        }
        fetch("http://localhost:3001/addReview", {
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

    return(
        <>
            <button className="report-button" onClick={() => {setDialogOpen(true)}}><FaStar /> Review this listing</button>
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