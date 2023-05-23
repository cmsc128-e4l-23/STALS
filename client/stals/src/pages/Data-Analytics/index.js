import React from "react";
import { useNavigate } from "react-router-dom";
import './Analytics.css';
import Header from "components/Header";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CircularProgress, IconButton } from "@mui/material";

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
                        GRAPH 1
                    </div>
                    <div className="container">
                        GRAPH 2
                    </div>
                </div>
                
            </div>
        </>
    )
}