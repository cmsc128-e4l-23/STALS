import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './Analytics.css';
import { CircularProgress, IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export default function AnalyticsBanner() {
    let navigate = useNavigate();
    const [data, setData] = useState(null);
    const [siteTraffic, setSiteTraffic] = useState(null);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const getVisits = () => {
        fetch('http://localhost:3001/getVisits', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                year: year,
                month: month,
                day: day
            }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    setSiteTraffic(body.return);
                    console.log(body);
                }
        })
    }

    const goToPage = () => {
        navigate('/admin/data-analytics')
    }

    // get site traffic
    useEffect(() => {
        fetch('http://localhost:3001/dataAnalytics', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    setData(body.return);
                    console.log(body);
                    getVisits();
                    console.log(siteTraffic);
            }
        })
    }, []);

    return (
        <div id="data-alaytics-banner">
            <div className="container">
                {siteTraffic == null ? <CircularProgress /> : <h2>Site Traffic: { siteTraffic.numVisits }</h2>}
            </div>
            <div className="container">
                <h2>A</h2>
            </div>
            <div className="container">
                <h2>B</h2>
            </div>
            <div className="container">
                <h2>C</h2>
            </div>
            <div className="container">
                <h2>D</h2>
            </div>
            <IconButton onClick={goToPage}><ArrowForwardIosOutlinedIcon/></IconButton>
        </div>
    );
}