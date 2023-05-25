import './AccommBody.css'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

export default function ReviewForm(){
    const [dialogOpen, setDialogOpen] = useState(false)
    const [content, setContent] = useState('')
    
    const submitReview = () => {
        alert(content);
    }

    return(
        <>
            <button className="report-button" onClick={() => {setDialogOpen(true)}}><FaStar /> Review this listing</button>
            <Dialog open={dialogOpen} onClose={() => {setDialogOpen(false)}}>
                <DialogTitle padding={5} lineHeight={.5}><h2>Review an accommodation</h2></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter detailed description of your review/experience.
                    </DialogContentText>
                    <br/>
                    <br/>
                    <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Report Details"
                    multiline
                    maxRows={5}
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
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