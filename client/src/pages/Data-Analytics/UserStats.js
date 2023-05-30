import { React, useState, useEffect } from "react";
import {CChart} from "@coreui/react-chartjs";
import { CircularProgress } from "@mui/material";
import "./Analytics.css"

export default function UserStats() {
    // [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }]
    const [userData, setUserData] = useState(null);
    
    // approved and pending accommodations
    const [appAccomm, setAppAccomm] = useState(null);
    const [pendAccomm, setPendAccomm] = useState(null);

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
                    console.log(body.return);
                    setUserData({ regUsers: body.return.numRegUsers, owners: body.return.numAccommOwners, students: body.return.numStudents });
                    setAppAccomm(body.return.numApprovedAccomm);
                    getPendAccomm();
                } else {
                    console.log(body.error)
                }
        })
    }, []);
    
    if (userData == null || pendAccomm == null || appAccomm === null) {
        return (
            <CircularProgress />
        )
    }
    else {
        return (
            <div id="polarChart">
                <div className="container">
                        USERS STATISTICS
                </div>
                <CChart
                    type="polarArea"
                    data={{
                        labels: ['Students', 'Accommodation Owners'],
                        datasets: [
                            {
                                backgroundColor: ['#41B883', '#E46651'],
                                data: [userData.students, userData.owners]
                            },
                        ],
                    }}
                    borderWidth={"1px"}
                />
            </div>
            
        )
    }

};