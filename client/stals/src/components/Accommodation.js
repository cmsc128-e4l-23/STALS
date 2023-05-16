import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import "./Accommodation.css";


// the accommodation card
// displays: photos of the accommodation
//           details below
export default function Accommodation({ accomm, loggedIn, bookmark }) {
    let navigate = useNavigate();

    const initBtn = () => {
        // if logged in: see if the accommodation is bookmarked
        if (loggedIn) {
            if (bookmark == null || bookmark.isEmpty()) return false; // 
            const state = bookmark.find(a => a == accomm._id);
            if (state != undefined) return true;
        }
        // else return null
        else return false;
    }

    const [button, setButton] = useState(initBtn());
    


    const clickBtn = (id) => {
        if (!loggedIn) { // can't click the button
            alert("You have to be logged in!"); // change to pop-up
            navigate('/login');
        } else {
            // check button value
            if (button) setButton(false);
            else setButton(true);
        }
    }

    return (
        <div className="body-element">
            {/* bookmark button */}
            <IconButton key={accomm._id} onClick={() => clickBtn(accomm._id)} className="favorite" >
                {button ? <BookmarkIcon id={accomm._id} /> : <BookmarkBorderIcon id={accomm._id} />}
            </IconButton>
        
        {/* image/s */}
        { /* reference: https://www.youtube.com/watch?v=McPdzhLRzCg */ }
            <div className="img-container">
                <div className="slider-wrapper">
                    <div className="images">
                        {accomm.photos.map((photo, index) => {
                            return <img id={"image-" + photo + "-" + index} src={require("assets/" + photo)} alt='' />
                        })}
                    </div>
                    {/* slider buttons */}
                    <div className="slider-btns">
                        {accomm.photos.map((photo, index) => {
                            return <a href={"#image-" + photo + "-" + index}></a>
                        })}
                    </div>
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
    )
}