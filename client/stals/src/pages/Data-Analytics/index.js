import React from "react";
import './Analytics.css';
import Header from "components/Header";

// page
export default function DataAnalytics() {
    return (
        <>
            <Header />
            <div id="analytics-body">
                <div className="container">
                    GRAPH 1
                </div>
                <div className="container">
                    GRAPH 2
                </div>
            </div>
        </>
    )
}