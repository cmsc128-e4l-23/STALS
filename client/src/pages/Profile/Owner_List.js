import React, { useState, useEffect } from "react";
import "./index.css";
import AccommBody from "./AccommBody.js";

export default function List({ email }) {
  const [accomms, setAccomms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active"); // Track active tab

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "getOwnerAccomms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setAccomms(data.accommodations);
      })
      .finally(() => setLoading(false));
  }, [email, loading]);

  // Function to handle tab selection
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id="lists">
      {accomms.length > 0 ? (
        <div>
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

          {/* Render sections based on active tab */}
          {activeTab === "active" && (
            <div className="grid-container">
              {accomms.map((accomm) => {
                return (
                  <div className="grid-item">
                    {!accomm.archived && accomm.approved && (
                      <AccommBody
                        accomm={accomm}
                        email={email}
                        setLoadin={setLoading}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "archived" && (
            <div className="grid-container">
              {accomms.map((accomm) => {
                return (
                  <div className="grid-item">
                    {accomm.archived && accomm.approved && (
                      <AccommBody
                        accomm={accomm}
                        email={email}
                        setLoadin={setLoading}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "pending" && (
            <div className="grid-container">
              {accomms.map((accomm) => {
                return (
                  <div className="grid-item">
                    {accomm.approved === false && (
                      <AccommBody
                        accomm={accomm}
                        email={email}
                        setLoading={setLoading}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div style={{marginTop:"200px"}}>No Accommodations found</div>
      )}
    </div>
  );
}
