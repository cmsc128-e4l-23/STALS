import React from "react";
import "./Modal.css";
import "./Button.css"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteModal({ modalOpen, setModalOpen, setLoading, accommodation }) {
    const deleteAccomm = () => {
        fetch(process.env.REACT_APP_API + 'deleteAccomm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(accommodation)
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
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">
                {"Are You Sure You Want to Delete?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
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
                                deleteAccomm();
                            }} 
                        >
                            Delete
                        </button>
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
