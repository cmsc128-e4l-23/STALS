import React from "react";
import "../ListAccomm/Modal.css";

export default function ReportModal({ setModalOpen, report }) {
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
                    <h3>{report.content}</h3>
                </div>
            </div>
        </div>
    );
}
