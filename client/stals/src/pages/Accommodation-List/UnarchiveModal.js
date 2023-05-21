import React from "react";
import "./Modal.css";

export default function UnarchiveModal({ setModalOpen, setLoading, accommodation }) {
    const unarchiveAccomm = () => {
        fetch('http://localhost:3001/unarchiveAccomm', {
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
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Are You Sure You Want to Unarchive?</h1>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setModalOpen(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            unarchiveAccomm();
                        }} 
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
