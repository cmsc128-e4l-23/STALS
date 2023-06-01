import React from "react";
import "../ListAccomm/Modal.css";

export default function ReportModal({ setModalOpen, report }) {
    return (
        <div className="modalBackground" style={{left:0}}>
            <div className="modalContainer" style={{width:'unset', height:'unset', 'max-width': '80vw', 'min-height': '130px', 'max-height': '80vh', 'margin-top': '100px', 'min-width': '30vw'}}>
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                        setModalOpen(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <span className="report-content"><b>Report Classification:</b> {report.classification}</span>
                <span className="report-content"><b>Status: </b> {report.status}</span>
                <br/>
                <span className="report-content" style={{fontSize:'20px', marginTop:'15px', 'overflow':'scroll', marginBottom:'15px'}}><b>Content:</b> {report.content}</span>
            </div>
        </div>
    );
}