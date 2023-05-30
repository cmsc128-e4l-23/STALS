import React from "react";
import "./Modal.css";

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
                    <h1>Are you sure you want to delete?</h1>
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
                        id="continueBtn">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
