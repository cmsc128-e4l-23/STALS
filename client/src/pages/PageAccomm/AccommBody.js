import React, { useEffect, useState } from "react";
import "./AccommBody.css";
import { Box, CircularProgress, Divider } from '@mui/material';
import { FaStar } from 'react-icons/fa';

import Description from "./Description";
import ReportForm from "./ReportForm";
import ReviewForm from "./ReviewForm";
import ContactDetails from "./ContactDetails";
import ReviewList from "./ReviewList";
import Loading from "../../components/Loading";

export default function AccommBody({ data, email, userType, isLoggedIn }) {
    const [accommData, setAccommData] = useState({});
    const [loading, setLoading] = useState(true);
    const [accommOwner, setAccommOwner] = useState({});
    const [imageList, setImageList] = useState([]);
    const [currentRating, setCurrentRating] = useState(0);
    const [priceRange, setPriceRange] = useState('');

    const assignPriceRange = (accomm) => {
        if (accomm.priceRange.minPrice == accomm.priceRange.maxPrice) {
            setPriceRange(`₱${accomm.priceRange.minPrice}.00`);
        }
        else setPriceRange(`₱${accomm.priceRange.minPrice}.00 - ${accomm.priceRange.maxPrice}.00`);
    }


    const fetchOwner = () => {
        fetch(process.env.REACT_APP_API + 'getAccommOwner', {
            method: 'POST',
            body: JSON.stringify({ _id: data }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    setAccommOwner(body.owner)
                }else{
                    alert(body.message);
                    console.log(body.error)
                }
            })
        }

    const fetchRating = () => {
            fetch(process.env.REACT_APP_API + 'getAccommRating?id=' + data, {
                method: 'GET',
            })
                .then(res => res.json())
                .then(body => {
                    if (body.success) {
                        setCurrentRating(body.rating)
                    }else{
                        alert(body.message);
                        console.log(body.error)
                    }
                })
            }
    
    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'getAccommFullDetails', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({_id: data})
        })
        .then(res => res.json())
        .then((body) => {
            if (body.success){
                setAccommData(body.accommodation)
                assignPriceRange(body.accommodation);
                fetchOwner(data);
                fetchRating(data);
                setLoading(false)
            }
            else {
                alert(body.message)
            }
        })
    }, [accommData]);

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
            <>
            <div className="accomm-page-div">
                {/* Accomm Name and Details */}
                <div className="accomm-name-details">
                    <div className="accomm-name-div">              
                        <h1>{accommData.name}</h1>
                    </div>
                    <div className="accomm-details-div">
                        <p> <FaStar /> {currentRating} • { accommData.reviews.length } reviews • {` ${accommData.address.barangay}, ${accommData.address.city}`} </p>
                    </div>
                </div>
                {/* Accomm Images */}
                <div className="accomm-image-book">

                    <div className="accomm-images">
                        <div className="img-container">
                            <div className="slider-wrapper">
                                <div className="images">
                                {accommData.photos.length > 0 ?
                                    <>
                                        {accommData.photos.map((photo, index) => {
                                        var base64Image = photo;
                                        return <img id={"image-"+ index} src={`data:image/*;base64,${base64Image}`} alt='' />

                                        })}
                                    </>
                                    :
                                    <img id={"image-no-picture"} src={require("../../assets/nopicture.jpg")} alt=''/>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accomm-book-owner">
                        <div className="accomm-book">
                            <div className="accomm-price">
                                <h1>{priceRange} per month</h1>
                            </div>
                            <ContactDetails contact={accommOwner.contact} />
                            <ReviewForm accommId={data} email={email} userType={userType} isLoggedIn={isLoggedIn} />
                            <ReportForm accommId={data} email={email} userType={userType} isLoggedIn={isLoggedIn} />
                   
                        </div>

                        <div className="accomm-type-owner">
                            <h1>
                                {accommData.accommodationType} hosted by <br/> {accommOwner.name}
                            </h1>
                        </div>

                        <Description description={accommData.description}/>
                    </div>
                </div>
                <Divider variant="middle" sx={{
                    marginTop: 5,
                    width: 0.9,
                    background: 'grey',
                }}/>
                <ReviewList reviews={accommData.reviews} />
            </div>
            </>

            
        ) 
    }
}