import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";

export default function DeleteModal({ setModalOpen, setLoading, accommodation, email }) {
    const deleteAccomm = () => {
        console.log(email)
        fetch(process.env.REACT_APP_API +'removeBookmarkAccomm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    accomm_id:accommodation._id,
                    user:email
                }
            )
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setModalOpen(false);
                setLoading(true);
            }
        });
    }


    return (
        <Dialog
            open={setModalOpen}
            onClose={() => {setModalOpen(false)}}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">
                {"Are you sure you want to remove this bookmark?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    {accommodation.name}
                    <div className="footer">
                        <button className="delete-btn"
                            onClick={() => {
                                setModalOpen(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button className="archive-btn"
                            onClick={() => {
                                deleteAccomm();
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
