import React, { useState,useEffect } from "react";
import "./AdminLog.css"

export default function AdminLog(){

    const [reports, setReports] = useState([]);
    const [accomRequests, setAccoms] = useState([]);

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
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify()
        })
        .then(res => res.json())
        .then(data => {
            setAccoms(data.pendApps)
        });
    })

    const closeReport = (_id) => {
        fetch(process.env.REACT_APP_API + 'resolveReport', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({_id: _id})
        })
        .then(res => res.json())
        .then(data => {
            if(!data.success){
                alert(data.message);
            }
        });
    }

    const approveAccom = (_id) => {
        fetch(process.env.REACT_APP_API + 'resolveReport', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({_id: _id})
        })
        .then(res => res.json())
        .then(data => {
            if(!data.success){
                alert(data.message);
            }
        });
    }

    const rejectAccom = (_id) => {
        fetch(process.env.REACT_APP_API + 'resolveReport', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({_id: _id})
        })
        .then(res => res.json())
        .then(data => {
            if(!data.success){
                alert(data.message);
            }
        });
    }

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
                                        <div className="report-item"><span>{report.content}</span><button onClick={closeReport(report._id)}>CLOSE</button></div>
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
                                        <div className="add-requests-item"><span>{accommodation.title}</span><button onClick={approveAccom(accommodation._id)}>APPROVE</button><button onClick={rejectAccom(accommodation._id)}>DENY</button></div>
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