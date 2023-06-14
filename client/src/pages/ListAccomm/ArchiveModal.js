import React from "react";
import "./Modal.css";
import "./Button.css"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ArchiveModal({ modalOpen, setModalOpen, setLoading, accommodation }) {
    const accommId = {
        _id: accommodation._id
    }
    const archiveAccomm = () => {
        fetch(process.env.REACT_APP_API + 'archiveAccomm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(accommId)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setModalOpen(false);
                setLoading(true);
            }else{
                alert(data.message);
            }
        });
    }


    return (
        <Dialog
            open={modalOpen}
            onClose={() => {setModalOpen(false)}}
            aria-labelledby="archive-dialog-title"
            aria-describedby="archive-dialog-description"
        >
            <DialogTitle id="archive-dialog-title">
                {"Are You Sure You Want to Archive?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="archive-dialog-description">
                    <div className="footer">
                        <button className="archive-btn"
                            onClick={() => {
                                setModalOpen(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button className="delete-btn"
                            onClick={() => {
                                archiveAccomm();
                            }} 
                        >
                            Continue
                        </button>
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
