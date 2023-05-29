import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import "./Accommodation.css";
import Loading from '../../components/Loading';


// the accommodation card
// displays: photos of the accommodation
//           details below
export default function AccommCard({ isLoggedIn, userType, email, accomm }) {
    let navigate = useNavigate();
    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoggedIn) {
            fetch(process.env.REACT_APP_API + 'checkIfBookmarked', {
                method: 'POST',
                body: JSON.stringify({
                    user: email,
                    accomm: accomm._id   
                }),
                headers: {
                    'Content-Type': "application/json"
                }
            })
            .then(res => res.json())
            .then(body => {
                if(body.success){
                    setBookmarked(body.bookmarked)
                }
                setLoading(false)
            })
        }
        setLoading(false)
    }, [])
    
    
    const addBookmark = (accomm_id) => {
        fetch(process.env.REACT_APP_API + 'bookmarkAccomm', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                accomm_id: accomm_id
            }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    setBookmarked(true);
                } else {
                    alert(body.msg);
                }
        })
    }

    const removeBookmark = (accomm_id) => {
        fetch(process.env.REACT_APP_API + 'removeBookmarkAccomm', {
            method: 'POST',
            body: JSON.stringify({
                user: email,
                accomm_id: accomm_id
            }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(res => res.json())
        .then(body => {
            if (body.success) {
                setBookmarked(false);
            } else {
                alert(body.msg);
            }
        })
    }

    const clickBtn = (id) => {
        if(isLoggedIn && userType === "Student"){
            if (bookmarked) {
                removeBookmark(id);
            }
            else {
                addBookmark(id);
            }
        }
        else { // can't click the button
            alert("Only logged in students can bookmark accommodations.");
        }
    }
    return (
        <>
            {loading ?
            <Loading />
            :
            <div className="body-element">
            {/* bookmark button */}
            <IconButton key={accomm._id} onClick={() => clickBtn(accomm._id)} className="favorite" >
                {bookmarked ? <BookmarkIcon id={accomm._id} /> : <BookmarkBorderIcon id={accomm._id} />}
            </IconButton>
        
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
                    <p>{`${accomm.address.street } ${accomm.address.barangay}, ${accomm.address.city}`}</p>
                    <p>{`Type: ${accomm.accommodationType}`}</p>
                    <h4>{`₱${accomm.priceRange.minPrice}.00 - ${accomm.priceRange.maxPrice}.00`}</h4>
                </div>
            </div>
        </div>

            }
        </>
    )
}
