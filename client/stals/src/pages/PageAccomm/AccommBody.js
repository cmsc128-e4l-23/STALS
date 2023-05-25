import React, { useEffect, useState } from "react";
import "./AccommBody.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FaStar } from 'react-icons/fa';
import { FaFlag } from 'react-icons/fa';
import ReportForm from "./ReportForm";
//npm install react icons

//Images
import image1 from '../../assets/pexels-christian-paul-del-rosario-1076240.jpg';
import { Grid } from "@mui/material";
import Description from "./Description";

export default function AccommBody({ data }) {
    const [accommData, setAccommData] = useState({});
    const [loading, setLoading] = useState(true);
    const [accommOwner, setAccommOwner] = useState();

    const [openDescription, setOpenDescription] = useState(false);
    const [openReportForm, setOpenReport] = useState(false);

    const handleOpenReport = () => {
        setOpenReport(true);
    };

    const handleCloseReport = () => {
        setOpenReport(false);
    }



    const handleClickDescription = () => {
        setOpenDescription(true);
    };

    const handleCloseDescription = () => {
        setOpenDescription(false);
    };

    const bookButton = () => {
        console.log("Book")
    }

    const reportButton = () => {
        console.log("Report")
    }

    const fetchOwner = () => {
        fetch('http://localhost:3001/getAccommOwner', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ _id: data }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    setAccommOwner(body.owner)
                    setLoading(false);
                }else{
                    alert(body.message);
                }
            })
            .catch((error) => {
                alert("An error has occurred");
            })
        }
    
    useEffect(() => {
        fetch('http://localhost:3001/getAccommFullDetails', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({_id: data})
        })
        .then(res => res.json())
        .then(body => {
            if (body.success){
                setAccommData(body.accommodation)
                fetchOwner(data);
            }
            else {
                alert(body.message)
            }
        })
    }, []);


    if(loading === true){
        return (
            <div className="accomm-page-div">
                <Box alignItems={"center"}>
                    <CircularProgress />
                </Box>
            </div>
        );
    } else {
        return(
            <div className="accomm-page-div">
                {/* Accomm Name and Details */}
                <div className="accomm-name-details">
                    <div className="accomm-name-div">              
                        <h1>{accommData.name}</h1>
                    </div>
                    <div className="accomm-details-div">
                        <p> <FaStar /> 4.62 • { accommData.reviews.length } reviews • {` ${accommData.address.barangay}, ${accommData.address.city}`} </p>
                    </div>
                </div>
                {/* Accomm Images */}
                <div className="accomm-image-book">

                    <div className="accomm-images">
                        <div className="img-container">
                            <div className="slider-wrapper">
                                <div className="images">
                                    {accommData.photos.map((photo, index) => {
                                        return <img id={"image-" + photo + "-" + index} src={require("assets/" + photo)} alt='' />
                                    })}
                                </div>
                                {/* slider buttons */}
                                <div className="slider-btns">
                                    {accommData.photos.map((photo, index) => {
                                        return <image href={"#image-" + photo + "-" + index}></image>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accomm-book-owner">
                        <div className="accomm-book">
                            <div className="accomm-price">
                                <h1>₱{accommData.priceRange.minPrice} - ₱{accommData.priceRange.maxPrice} per month</h1>
                                {/* <h2 className="book-review"><FaStar /> 4.62 • 52 reviews</h2> */}
                            </div>
                            {/* <div>
                                <button className="book-button" onClick={() => bookButton()}>Check Availability</button>
                            </div> */}
                            <ReportForm />
                   
                        </div>

                        <div className="accomm-type-owner">
                            {/* temporary accommodation owner name */}
                            <h1>
                                {accommData.accommodationType} hosted by {accommOwner.name}
                                <h2>2 guests • 1 bedroom • 2 beds</h2> {/* TODO: make dynamic */}
                            </h1>             
                            {/* temporary profile pic
                                clickable - will redirect to profile page of owner
                            */}
                            <img className="profileImage" src={image1} alt='' />
                        </div>

                        <Description description={accommData.description}/>
                    </div>
                    
                </div>
                
                
                
                
            </div>
            
        ) 
    }
}