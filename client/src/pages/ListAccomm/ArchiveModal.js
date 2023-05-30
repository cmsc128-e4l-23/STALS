import React from "react";
import "./Modal.css";

export default function ArchiveModal({ setModalOpen, setLoading, accommodation }) {
    const archiveAccomm = () => {
        fetch(process.env.REACT_APP_API + 'archiveAccomm', {
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
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                        setModalOpen(false);
                        }}
                        id="xBtn">
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Are You Sure You Want to Archive?</h1>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setModalOpen(false);
                        }}
                        id="cancelBtn">
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            archiveAccomm();
                        }} 
                        id="continueBtn">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
