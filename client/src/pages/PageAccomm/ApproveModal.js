import React from "react";
import "../ListAccomm/Modal.css";
import "../ListAccomm/Button.css"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";

export default function ApproveModal({ modalOpen, setModalOpen, accommodation, setLoading }) {



    const approveAccomm = () => {
        fetch(process.env.REACT_APP_API + 'approveAccomm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({accomm_id: accommodation._id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setModalOpen(false);
                setLoading(true)
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
                {"Are You Sure You Want to Approve?"}
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
                                approveAccomm();
                            }} 
                        >
                            Approve
                        </button>
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
