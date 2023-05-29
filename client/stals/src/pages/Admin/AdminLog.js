import React, { useState,useEffect } from "react";
import "./AdminLog.css"
import ReportModal from "./ReportModal.js";
import { useNavigate } from 'react-router-dom';

export default function AdminLog(){

    let navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [accomRequests, setAccoms] = useState([]);

    // gets pending reports from the server
    useEffect(() => {
        fetch('http://localhost:3001/viewReports', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({onlyPending: true})
        })
        .then(res => res.json())
        .then(data => {
            setReports(data.result)
            // console.log(data);
        });

        // Get accomodations that need approving
        
        fetch('http://localhost:3001/getPendApp', {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify()
        })
        .then(res => res.json())
        .then(data => {
            setAccoms(data.pendApps)
        })
        .catch(error => {
            console.log(error);
        })
        ;
    }, [])

    const closeReport = (report) => {
        fetch('http://localhost:3001/resolveReport', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(report)
        })
        .then(res => res.json())
        .then(data => {
            if(!data.success){
                // alert(data.message);
            }
        });
    }

    const approveAccom = (accom) => {
        fetch('http://localhost:3001/approveAccomm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({accomm_id: accom._id})
        })
        .then(res => res.json())
        .then(data => {
            if(!data.success){
                // alert(data.message);
            }
        });
    }

    const rejectAccom = (accom) => {
        fetch('http://localhost:3001/deleteAccomm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(accom)
        })
        .then(res => res.json())
        .then(data => {
            if(!data.success){
                // alert(data.message);
            }
        });
    }

    const [modalOpen, setModalOpen] = useState(false);

    return(
        <>

            <div className="reports-box">
            {reports.length > 0 ? <div>
                    <h2>Reports</h2>
                    <div className="reports-container">
                        {
                            reports.map((report)=>{
                                return(
                                    <>
                                        {modalOpen && <ReportModal setModalOpen={setModalOpen} report={report} />}
                                        <div className="report-item">
                                            <span>{report.content}</span>
                                            <button onClick={()=>{closeReport(report)}}>CLOSE</button>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                : <h3>No reports found.</h3>
            }
            </div>
            

            <div className="add-requests-box">
            {accomRequests.length > 0 ? 
                <div>
                    <h2>Add Requests</h2>
                    <div className="add-requests-container">
                        {
                            accomRequests.map((accommodation)=>{
                                return(
                                    <>
                                        <div  className="add-requests-item">
                                            <span onClick={() => {navigate("/accomm?id=" + accommodation._id)}} >{accommodation.name}</span>
                                            <button onClick={()=>{approveAccom(accommodation)}}>APPROVE</button>
                                            <button onClick={()=>{rejectAccom(accommodation)}}>DENY</button>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                : <h3>No accommodation requests found.</h3>
            }
            </div>
        </>
    )
}