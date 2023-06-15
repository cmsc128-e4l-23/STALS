import React, { useState,useEffect } from "react";
import "./AdminLog.css"
import ReportModal from "./ReportModal.js";
import { useNavigate } from "react-router-dom";

export default function AdminLog(){
    let navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [accomRequests, setAccoms] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [reportToView, setReportView] = useState({});

    // gets pending reports from the server
    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'viewReports', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({onlyPending: true})
        })
        .then(res => res.json())
        .then(data => {
            setReports(data.result)
        });

        // Get accomodations that need approving
        
        fetch(process.env.REACT_APP_API + 'getPendApp', {
        method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            setAccoms(data.pendApps)
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

    const closeReport = (report) => {
        fetch(process.env.REACT_APP_API + 'resolveReport', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(report)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                let new_reports = reports.filter(function(matchreport) {
                    return matchreport !== report
                });
                setReports(new_reports);
            }else{
                alert(data.message)
            }
        });
    }

    const approveAccom = (accom) => {
        let input = {
            accomm_id: accom.id
        }
        fetch(process.env.REACT_APP_API + 'approveAccomm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({accomm_id: accom._id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                let new_accoms = accomRequests.filter(function(matchaccom) {
                    return matchaccom !== accom
                });
                setAccoms(new_accoms);
            }else{
                alert(data.message);
            }
        });
    }

    const rejectAccom = (accom) => {
        const accom_id = {_id: accom._id}
        fetch(process.env.REACT_APP_API + 'deleteAccomm', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(accom_id)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                let new_accoms = accomRequests.filter(function(matchaccom) { 
                    return matchaccom !== accom
                });
                setAccoms(new_accoms);
            }else{
                alert(data.message)
            }
        });
    }

    const clickReport = (report) => {
        setReportView(report);
        setModalOpen(true);
    }

    return(
        <>
            <div className="admin-log-container">
                <div className="reports-box">
                <h2>Reports</h2>
                        <div className="reports-container">
                        {reports.length > 0 ? <div>
                            {
                                reports.map((report)=>{
                                    return(
                                        <>
                                            {modalOpen && <ReportModal setModalOpen={setModalOpen} report={reportToView}/>}
                                            <div className="report-item">
                                                <span onClick={()=>{clickReport(report)}}>{report.content}</span>
                                                <button onClick={()=>{closeReport(report)}}>CLOSE</button>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        : 
                        <h3 style={{fontSize:'14px'}}><i>No pending reports found.</i></h3>
                      }
                    </div>
                </div>
                
                <div className="add-requests-box">
                    <div>
                            <h2>Add Requests</h2>
                {accomRequests.length > 0 ? 

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
                    : <h3 style={{fontSize:'14px'}}><i>No accommodation requests found.</i></h3>
                }
                </div>
            </div>
            </div>
        </>
    )
}