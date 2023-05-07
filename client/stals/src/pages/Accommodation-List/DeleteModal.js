import React from "react";
//import "./Modal.css";

export default function DeleteModal({ setModalOpen, setAccomms, accommodation }) {
    const deleteAccomm = () => {
        fetch('http://localhost:3001/deleteAccomm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(accommodation)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setAccomms([]);
                setModalOpen(false);
            }else{
                alert(data.success);
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
                    <h1>Are You Sure You Want to Delete?</h1>
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
                            deleteAccomm();
                        }} 
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
