import React from "react";
import "./Modal.css";
import "./Button.css"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UnarchiveModal({ modalOpen, setModalOpen, setLoading, accommodation }) {
    const accommId = {
        _id: accommodation._id
    }
    const unarchiveAccomm = () => {
        fetch(process.env.REACT_APP_API + 'unarchiveAccomm', {
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
        // <div className="modalBackground">
        //     <div className="modalContainer">
        //         <div className="titleCloseBtn">
        //             <button
        //                 onClick={() => {
        //                 setModalOpen(false);
        //                 }}
        //             >
        //                 X
        //             </button>
        //         </div>
        //         <div className="title">
        //             <h1>Are You Sure You Want to Unarchive?</h1>
        //         </div>
        //         <div className="footer">
        //             <button
        //                 onClick={() => {
        //                     setModalOpen(false);
        //                 }}
        //                 id="cancelBtn"
        //             >
        //                 Cancel
        //             </button>
        //             <button
        //                 onClick={() => {
        //                     unarchiveAccomm();
        //                 }} 
        //             >
        //                 Continue
        //             </button>
        //         </div>
        //     </div>
        // </div>

        <Dialog
            open={modalOpen}
            onClose={() => {setModalOpen(false)}}
            aria-labelledby="unarchive-dialog-title"
            aria-describedby="unarchive-dialog-description"
        >
            <DialogTitle id="unarchive-dialog-title">
                {"Are You Sure You Want to Unarchive?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="unarchive-dialog-description">
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
                                unarchiveAccomm();
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
