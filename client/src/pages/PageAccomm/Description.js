import './AccommBody.css'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Description({description}){
    const [descOpen, setDescOpen] = useState(false)
    return(
        <>
            <div className="accomm-description">
                <h1>Description</h1>
                <p>{description}</p>
            </div>
            <button className="see-all-button" onClick={() => {setDescOpen(true)}}>See More</button>
            <Dialog
                open={descOpen}
                onClose={() => {setDescOpen(false)}}
                aria-labelledby="description-dialog-title"
                aria-describedby="Description-dialog-description"
            >
                <DialogTitle id="Description-dialog-title">
                    {"Description"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="Description-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}