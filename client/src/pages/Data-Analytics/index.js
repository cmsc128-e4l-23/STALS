import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Analytics.css';
import UserStats from "./UserStats";
import AccommStats from "./AccommStats";
import SiteTraffic from "./SiteTraffic";

// page
export default function DataAnalytics() {
    let navigate = useNavigate();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const [userData, setUserData] = useState(null);
    const [appAccomm, setAppAccomm] = useState(null);
    const [pendAccomm, setPendAccomm] = useState(null);
    const [siteTraffic, setSiteTraffic] = useState(null);

    
    const goBack = () => {
        navigate("/admin");
    }

    const getVisits = () => {
        fetch('http://localhost:3001/getVisits', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                year: year,
                month: month+1,
                day: day
            }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    setSiteTraffic(body.return[year]);
                }
        })
    }

    const getPendAccomm = () => {
        fetch('http://localhost:3001/getPendApp', {
            method: 'GET',
            credentals: 'include'
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    setPendAccomm(body.numPendApps);
                }
        })
    }

    useEffect(() => {
        fetch('http://localhost:3001/dataAnalytics', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    // console.log(body.return);
                    setUserData({ regUsers: body.return.numRegUsers, owners: body.return.numAccommOwners, students: body.return.numStudents });
                    setAppAccomm(body.return.numApprovedAccomm);
                    getPendAccomm();
                    getVisits();
                } else {
                    console.log(body.error)
                }
        })
    }, []);

    return (
        <>
            <div id="analytics-body">
                <div id="back-button">
                    <button onClick={goBack}>ADMIN PAGE</button>
                </div>

                <div id="up-graph">
                    <SiteTraffic data={siteTraffic} />
                </div>
                <div id="graphs">
                    <div className="container">
                        <UserStats />
                    </div>
                    <div className="container">
                        <AccommStats userData={userData} pendAccomm={pendAccomm} appAccomm={appAccomm} />
                    </div>
                </div>
            </div>
        </>
    )
}