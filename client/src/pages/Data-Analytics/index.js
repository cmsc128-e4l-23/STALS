import React from "react";
import { useNavigate } from "react-router-dom";
import './Analytics.css';
import Header from "components/Header";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CircularProgress, IconButton } from "@mui/material";
import UserStats from "./UserStats";
import AccommStats from "./AccommStats";

// page
export default function DataAnalytics() {
    let navigate = useNavigate();
    
    const goBack = () => {
        navigate("/admin");
    }

    return (
        <>
            <Header />
            <div id="analytics-body">
                <IconButton onClick={goBack}><ArrowBackIosNewOutlinedIcon /> <p>{ "ADMIN PAGE"}</p></IconButton>
                <div id="graphs">
                    <div className="container">
                        <UserStats />
                    </div>
                    <div className="container">
                        <AccommStats />
                    </div>
                </div>
            </div>
        </>
    )
}