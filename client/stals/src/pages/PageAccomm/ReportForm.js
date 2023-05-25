import './AccommBody.css'
import { useState } from 'react'
import { FaFlag } from 'react-icons/fa';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

export default function ReportForm({ accommId }){
    const [dialogOpen, setDialogOpen] = useState(false)
    const [content, setContent] = useState('')
    
    const submitReport = () => {
        let newReport = {
            user: localStorage.getItem('email'),
            reported_id: accommId,
            classification: "Accommodation",
            content: content,
        }
        fetch("http://localhost:3001/reportAccomm", {
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

    return(
        <>
            <button className="report-button" onClick={() => {setDialogOpen(true)}}><FaFlag /> Report this listing</button>
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