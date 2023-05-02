import { React, useState, useEffect } from "react";
import "./Body.css";
import Filter from "components/Filter";
import { Favorite, FavoriteBorderRounded } from '@mui/icons-material/';
import { IconButton } from '@mui/material';


export default function Body({data}) {
    const [isLoggedIn, setLoggedIn] = useState(null);
    const [accommList, udpateAccomm] = useState([]);
    const [bookmarkList, updateBookmark] = useState([]);

    // search
    // use `data` prop
    const fetchAccomm = () => {
        fetch('http://localhost:3001/searchAccomm', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ searchString: data }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                setSuccess(body.success);
                if (body.success) udpateAccomm(body.result);
                else udpateAccomm([]);
        })
    }

    // check if logged in
    useEffect(() => {
        fetch('http://localhost:3001/checkifloggedin', {
        method: 'POST',
        credentials: 'include'
        })
        .then(res => res.json())
        .then(body => {
            setLoggedIn(body.isLoggedIn);
            if(body.isLoggedIn){
                // get bookmarks (type: ObjectID)
                // fetchBookmark();
            }
            fetchAccomm();
        })
    }, []);

    // initialize favorite buttons
    const initFavBtn = () => {
        var states = {};
        accommList.forEach((accomm, index) => {
            states[accomm._id] = { value: false, obj: <FavoriteBorderRounded key={accomm._id} /> };
        });
        console.log(states);
        return states;
        
    }
    const [favBtnState, updateFavBtnState] = useState(initFavBtn());
    const [success, setSuccess] = useState(false);

    // changes the state of the button on click
    const clickFavBtn = (id) => {
        var states = favBtnState;

        // get the button clicked
        var btn = states[id];

        // changed btn type depending on the value of value
        if (states[id].value) {
            btn.obj = <Favorite key={id} />;
        } else 
            btn.obj = <FavoriteBorderRounded key={id} />

        console.log(states);
        return states;
    }

    // not searching anything
    // Homepage
    if (data === "") {
        return (
            // the whole body
            <div className="body-div">
                {/* filter component */}
                <Filter />
                {/* body-container: contains the category title and the accommodation card */}
                <div className="body-container">
                    <h1>Within UPLB Vicinity</h1>
                {/* body-group: multiple body-elements */}
                {/* body-element: image and button/s */}
                    <div id="inside" className="body-group">
                        {accommList.map((accomm, index) => {
                            if (accomm.generalLocation <= 1000) {
                                return <div key={index} className="body-element">
                                    {/* favorite button */}
                                    <IconButton onClick={() => clickFavBtn(accomm._id)} className="favorite" >
                                        {/* {favBtnState[accomm._id].obj} */}
                                        <FavoriteBorderRounded key={accomm._id} />
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
                            }
                        })}
                    </div>
                </div>
                <div id="outside" className="body-container">
                    <h1>Outside UPLB</h1>
                    <div className="body-group">
                    {accommList.map((accomm, index) => {
                            if (accomm.generalLocation > 1000) {
                                return <div key={index} className="body-element">
                                    {/* favorite button */}
                                    <IconButton onClick={() => clickFavBtn(accomm._id)} className="favorite" >
                                        {/* {favBtnState[accomm._id].obj} */}
                                        <FavoriteBorderRounded key={accomm._id} />
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
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // return search results
    else {
        // fetch accommodations
        fetchAccomm();

        // display results accordingly
        // accommodation not found
        if (accommList === null || !accommList.length) {
            return (
                <div className="body-div">
                    <Filter />
                    <h3 id="not-found">Accommodation not found</h3>
                </div>
            );
        }

        // accommodation found
        return (
            // the whole body
            <div className="body-div">
                <Filter />
                {/* body-container: contains the category title and the accommodation card */}
                <div className="body-container">
                {/* body-group: multiple body-elements */}
                {/* body-element: image and button/s */}
                    <div className="body-group">
                        {accommList.map((accomm, index) => {
                            return <div key={index} className="body-element">
                                    {/* favorite button */}
                                    <IconButton onClick={() => clickFavBtn(accomm._id)} className="favorite" >
                                        {favBtnState[accomm._id].obj}
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
                        })}
                    </div>
                </div>
            </div>
        );
    }
}