import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

export default function BookmarkBody({ bookmark_id, email, setLoading }){
    const navigate = useNavigate()
    const [accommData, setAccommData] = useState(null);
    
    useEffect(() => {
        fetch(process.env.REACT_APP_API +'getAccommFullDetails', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({_id: bookmark_id})
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setAccommData(data.accommodation)  
                console.log(data.accommodation)
            }
        });
        
    }, [])

    return(
            <>
            {accommData &&
            <div onClick={() => {navigate("/accomm?id=" + accommData._id)}}>
            <div className="img-container">
                <div className="slider-wrapper">
                    <div className="images">
                    <div className="images" style={{width:"300px", height:"200px"}}>
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
                    {/* slider buttons */}
                    <div className="slider-btns">
                    {accommData.length > 0 &&
                        <>
                        {accommData.photos.map((photo, index) => {
                            return <a href={"#image-" + photo + "-" + index}></a>
                        })}
                        </>
                    }
                    </div>
                </div>
            </div>
            {/* details */}
            <div className="details">
                <h3>{ accommData.name}</h3>
                </div>
        </div>
            }
            </>
    )
}