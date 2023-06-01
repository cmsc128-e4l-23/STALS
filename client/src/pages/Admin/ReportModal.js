import React from "react";
import "../ListAccomm/Modal.css";

export default function ReportModal({ setModalOpen, report }) {
    return (
        <div className="modalBackground" style={{left:0}}>
            <div className="modalContainer" style={{width:'unset', height:'unset', 'max-width': '80vw', 'min-height': '300px', 'max-height': '80vh', 'margin-top': '100px', 'min-width': '50vw'}}>
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