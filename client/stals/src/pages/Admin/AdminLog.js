import React, { useState } from "react";
import "./AdminLog.css"

export default function AdminLog(){

    const [logEntries, setLogEntries] = useState([]);

    // Function that gets log entries from the server
    // const getEntries = () =>{
    // }

    return(
        <>
            <div className="reports-box">
                <h2>Reports</h2>
                <div className="reports-container">
                    <div className="report-item"><span>Report #1</span><button>CLOSE</button></div>
                    <div className="report-item"><span>Report #1</span><button>CLOSE</button></div>
                    <div className="report-item"><span>Report #1</span><button>CLOSE</button></div>
                </div>
            </div>

            <div className="add-requests-box">
                <h2>Add Requests</h2>
                <div className="add-requests-container">
                    <div className="add-requests-item"><span>Acommodation #1</span><button>APPROVE</button><button>DENY</button></div>
                </div>
            </div>

        </>
    )
}