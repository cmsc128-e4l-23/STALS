import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import UnarchiveButton from "./UnarchiveButton";
import './index.css'
import { useNavigate } from "react-router-dom";
import './profile.css'

export default function List({email}){
    let navigate = useNavigate();
    const [accomms, setAccomms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("active");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
      }; // Added state for active tab

    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'getOwnerAccomms', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            setAccomms(data.accommodations)
        });
        setLoading(false)
    }, [email, loading])

    // Filter accommodations based on the selected tab
    const filteredAccomms = accomms.filter(accomm => {
        if (activeTab === "active") {
            return !accomm.archived && accomm.approved;
        } else if (activeTab === "archived") {
            return accomm.archived && accomm.approved;
        } else if (activeTab === "pending") {
            return !accomm.approved;
        }
        return false;
    });

    return(
        <div id="lists">
           <div className="tabs">
            {/* Active Tab */}
            <div
              className={`tab ${activeTab === "active" ? "active" : ""}`}
              onClick={() => handleTabClick("active")}
            >
              Active
            </div>

            {/* Archived Tab */}
            <div
              className={`tab ${activeTab === "archived" ? "active" : ""}`}
              onClick={() => handleTabClick("archived")}
            >
              Archived
            </div>

            {/* Pending Tab */}
            <div
              className={`tab ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => handleTabClick("pending")}
            >
              Pending
            </div>
          </div>
            
            {filteredAccomms.length > 0 ? (
                <div>
                    <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Accommodations:</h2>
                    {filteredAccomms.map((accomm) => (
                        <ul key={accomm._id}>
                            <li>
                                <div id='li-container' >
                                    <h3 id='accomm-name' onClick={() => {navigate("/accomm?id=" + accomm._id)}}>{accomm.name}</h3>
                                    {activeTab === "active" && (
                                        <>
                                            <ArchiveButton accommodation={accomm} setLoading={setLoading} />
                                            <DeleteButton accommodation={accomm} setLoading={setLoading} />
                                        </>
                                    )}
                                    {activeTab === "archived" && (
                                        <>
                                            <UnarchiveButton accommodation={accomm} setLoading={setLoading} />
                                            <DeleteButton accommodation={accomm} setLoading={setLoading} />
                                        </>
                                    )}
                                    {activeTab === "pending" && (
                                        <DeleteButton accommodation={accomm} setLoading={setLoading} />
                                    )}
                                </div>
                            </li>
                        </ul>
                    ))}
                </div>
            ) : (
                <div>No Accommodations found</div>
            )}
        </div>
    )
}
