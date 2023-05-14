import React, { useEffect, useState, useCallback } from "react";
import "./AccommBody.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FaStar } from 'react-icons/fa';
import { FaFlag } from 'react-icons/fa';
import { TbAirConditioning } from 'react-icons/tb';
import { AiFillCar } from 'react-icons/ai';
import { MdPets } from 'react-icons/md';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//npm install react icons

//Images
import image1 from '../../assets/pexels-christian-paul-del-rosario-1076240.jpg';

export default function AccommBody({ data }) {
    const [accommData, setAccommData] = useState({});
    const [loading, setLoading] = useState(true);
    const [accommOwner, setAccommOwner] = useState();

    const [openDescription, setOpenDescription] = useState(false);

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

    const fetchOwner = useCallback(() => {
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
                    console.log("owner:"+body.user)
                    setAccommOwner(body.User)
                }
            })
    }, [data]);
    
    
    useEffect(() => {
        fetch('http://localhost:3001/getAccommBasicDetails', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({_id: data})
        })
        .then(res => res.json())
        .then(body => {
            if (body.success){
                console.log(body.accommodation)
                setAccommData(body.accommodation)
                fetchOwner(data);
                setLoading(false);
            }
            else {
                alert(body.message)
            }
        })
    }, []);


    if(loading == true){
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
                        <p> <FaStar /> 4.62 • 52 reviews • {` ${accommData.address.barangay}, ${accommData.address.city}`} </p>
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
                                        return <a href={"#image-" + photo + "-" + index}></a>
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
                            <div>
                                <button className="book-button" onClick={() => bookButton()}>Check Availability</button>
                            </div>
                            <div>
                                <button className="report-button" onClick={() => reportButton()}><FaFlag /> Report this listing</button>
                            </div>                      
                        </div>

                        <div className="accomm-type-owner">
                            {/* temporary accommodation owner name */}
                            <h1>
                                {accommData.accommodationType} hosted by Accomodation Owner Name
                                <h2>2 guests • 1 bedroom • 2 beds</h2>
                            </h1>             
                            {/* temporary profile pic
                                clickable - will redirect to profile page of owner
                            */}
                            <img className="profileImage" src={image1} alt='' />
                        </div>

                        <div className="accomm-description">
                            <h1>Description</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <button className="see-all-button" onClick={handleClickDescription}>See More</button>
                        <Dialog
                            open={openDescription}
                            onClose={handleCloseDescription}
                            aria-labelledby="description-dialog-title"
                            aria-describedby="Description-dialog-description"
                        >
                            <DialogTitle id="Description-dialog-title">
                            {"Description"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="Description-dialog-description">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </DialogContentText>
                            </DialogContent>
                        </Dialog>

                    </div>
                    
                </div>
                
                
                
                
            </div>
            
        ) 
    }
}