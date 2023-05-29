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
    const [accommOwner, setAccommOwner] = useState();
    cosnt [imageList, setImageList] = useState([]);


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
        fetch(process.env.REACT_APP_API + 'getAccommFullDetails', {
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
            <>
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
                                {imageList.length > 0 ?
                                    <>
                                        {accommData.photos.map((photo, index) => {
                                        //return <img id={"image-" + photo + "-" + index} src={require("../../assets/" + photo)} alt='' />

                                        })}
                                    </>
                                    :
                                    <Loading />
                                }
                                </div>
                                {/* slider buttons */}
                                <div className="slider-btns">
                                {imageList.length > 0 &&
                                    <>
                                        {accommData.photos.map((photo, index) => {
                                        return <div href={"#image-" + photo + "-" + index}></div>
                                        })}
                                    </>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accomm-book-owner">
                        <div className="accomm-book">
                            <div className="accomm-price">
                                <h1>₱{accommData.priceRange.minPrice} - ₱{accommData.priceRange.maxPrice} per month</h1>
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