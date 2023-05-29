import './AccommBody.css'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ContactDetails({contact}){
    const [descOpen, setDescOpen] = useState(false)
    return(
        <>
            <button className="book-button" onClick={() => {setDescOpen(true)}}>Contact for Availability/Booking</button>
            <Dialog
                open={descOpen}
                onClose={() => {setDescOpen(false)}}
                aria-labelledby="description-dialog-title"
                aria-describedby="Description-dialog-description"
            >
                <DialogTitle id="Description-dialog-title">
                    {"Contact Information"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="Description-dialog-description">
                        Contact Number: {contact}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}