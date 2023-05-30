import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { IconButton } from "@mui/material";
import Loading from '../../components/Loading';
import './Analytics.css';

export default function AnalyticsBanner() {
    let navigate = useNavigate();
    const [data, setData] = useState(null);
    const [siteTraffic, setSiteTraffic] = useState(null);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const monthName = today.toLocaleString('default', { month: 'long' });

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
                    setSiteTraffic(body.return[year][monthName][day-1]);
                    console.log(siteTraffic);
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
                    getVisits();
            }
        })
    }, []);

    return (
        <div id="data-analytics-banner">
            <div className="container">
                {siteTraffic == null ? <Loading /> : <><h2>SITE TRAFFIC: </h2>{ siteTraffic }</>}
            </div>
            <div className="container">
                {data == null ? <Loading /> : <><h2>ACCOMMODATION OWNERS</h2> { data.numAccommOwners }</>}
            </div>
            <div className="container">
                {data == null ? <Loading /> : <><h2>APPROVED ACCOMMODATIONS</h2> { data.numApprovedAccomm }</>}
            </div>
            <div className="container">
                {data == null ? <Loading /> : <><h2>REGISTERED USERS</h2> { data.numRegUsers }</>}
            </div>
            <div className="container">
                {data == null ? <Loading /> : <><h2>STUDENTS</h2> { data.numStudents }</>}
            </div>
            <IconButton onClick={goToPage}><ArrowForwardIosOutlinedIcon/></IconButton>
        </div>
    );
}