import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

export default function AccommBody({accomm, email, setLoading }){
    const navigate = useNavigate()
    console.log('THis is the accomm')
    console.log(accomm)
    

    return (
        <>
            <div className="body-element">
            {/* bookmark button */}
            
        
        {/* image/s */}
        { /* reference: https://www.youtube.com/watch?v=McPdzhLRzCg */ }
            
            <div onClick={() => {navigate("/accomm?id=" + accomm._id)}}>
                <div className="img-container">
                    <div className="slider-wrapper">
                        <div className="images">
                        {accomm.photos.length > 0 ?
                            <>
                            {accomm.photos.map((photo, index) => {
                                var base64Image = photo;
                                return <img id={"image-"+ index} src={`data:image/*;base64,${base64Image}`} alt='' />
                            })}
                            </>
                            :
                            <img id={"image-no-picture"} src={require("../../assets/nopicture.jpg")} alt=''/>
                        }   
                        </div>
                        {/* slider buttons */}
                        {/* <div className="slider-btns">
                        {accomm.photos.length > 0 &&
                            <>
                            {accomm.photos.map((photo, index) => {
                                var base64Image = photo;
                                return <img id={"image-"+ index} src={`data:image/*;base64,${base64Image}`} alt='' />
                            })}
                            </>
                        }
                        </div> */}
                    </div>
                </div>
                {/* details */}
                <div className="details">
                    <h3>{ accomm.name}</h3>
                   </div>
            </div>
        </div>

            
        </>
    )
}