import './AccommBody.css';
import React, { useState } from 'react';
import { FaFlag } from 'react-icons/fa';
import { 
    Dialog, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    TextField, 
    Button, 
    DialogActions 
    } from '@mui/material';

export default function ReportForm({ accommId, email, userType, isLoggedIn }){
    const [dialogOpen, setDialogOpen] = useState(false)
    const [content, setContent] = useState('')
    
    const submitReport = () => {
        let newReport = {
            user: email,
            reported_id: accommId,
            classification: "Accommodation",
            content: content,
        }
        fetch(process.env.REACT_APP_API + 'reportAccomm', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReport),
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
        if(!isLoggedIn) alert("Log in required to report.")

        else if(userType === "Accommodation Owner")
            alert("Accommodation owners are not allowed to report.")
        else if(userType === "Admin")
            alert("Admins are not allowed to report accommodations.")
        else setDialogOpen(true)
    }

    return(
        <>
            <button className="report-button" onClick={openDialog} hidden={userType==="Admin"}><FaFlag /> Report this listing</button>
            <Dialog open={dialogOpen} onClose={() => {setDialogOpen(false)}}>
                <DialogTitle padding={5} lineHeight={.5}><h2>Report an accommodation</h2></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter detailed description of your report/experience.
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
                        <Button onClick={submitReport}>Report</Button>
                </DialogActions>
            </Dialog>
        </>
        
    )
}