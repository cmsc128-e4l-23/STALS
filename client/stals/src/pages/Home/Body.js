import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Filter from "components/Filter";
import {Link} from "react-router-dom";
import "./Body.css";


export default function Body({ data }) {
    let navigate = useNavigate();

    const [isLoggedIn, setLoggedIn] = useState(null);
    const [accommList, udpateAccomm] = useState([]);
    const [bookmarkList, updateBookmark] = useState([]);
    const [buttons, updateButtons] = useState({});
    const [success, setSuccess] = useState(false);
    const [fetchedAccomm, updateFetchAccomm] = useState(null);

    // initialize buttons
    const initButton = () => {
        var btns = {};
        accommList.forEach((accomm, index) => {
            btns[accomm._id] = false;
        });
        return btns;
    }

    // updates accommodation list (accommList) and whether there are accommodations fetched (fetchedAccomm)
    const updateData = (list) => {
        udpateAccomm(list);

        if (list.length === 0) updateFetchAccomm(false); // empty list, show "Accommodation not found!"
        else updateFetchAccomm(true); // display accommodations
    }

    //accomm-page
    const navigateAccomm = (id) => {
        const searchPage = document.createElement('a');
        searchPage.href = "/accommodation-page?id=" + id;
        document.body.appendChild(searchPage);
        searchPage.click();
    }

    // search
    // use `data` prop
    const fetchAccomm = useCallback(() => {
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
                if (body.success) {
                    updateData(body.result);
                    updateButtons(initButton());
                }
                else udpateAccomm([]);
            })
    }, [data]);

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
                setLoggedIn(body.isLoggedIn);
            }
            fetchAccomm();
        })
    }, []);

    // changes the state of the button on click
    const clickFavBtn = (id) => {
        console.log(id)
        console.log(isLoggedIn);

        if (isLoggedIn) {
            var btns = buttons;
            btns[id] = !btns[id];
            console.log(btns[id]);
            updateButtons(btns);
        } else {
            alert("You have to be logged in!"); // change to pop-up
            navigate('/login');
        }
        
    }

    // loading
    if (fetchedAccomm == null) {
        return (
            <div className="body-div">
                <Filter />
                <Box alignItems={"center"}>
                    <CircularProgress />
                </Box>
            </div>
        );
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
                                    {/* bookmark button */}
                                    <IconButton id={index} key={index} onClick={() => clickFavBtn(accomm._id)} className="favorite" >
                                        {buttons[accomm._id] ? <BookmarkIcon id={accomm._id} /> : <BookmarkBorderIcon id={accomm._id} />}
                                    </IconButton>
                                
                                {/* image/s */}
                                { /* reference: https://www.youtube.com/watch?v=McPdzhLRzCg */ }
                                    <div className="img-container">
                                        <div className="slider-wrapper">
                                            <div className="images">
                                                {accomm.photos.map((photo, index) => {
                                                    return <img id={"image-" + photo + "-" + index} onClick={ () => navigateAccomm(accomm._id)} src={require("assets/" + photo)} alt='' />
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
                                        <BookmarkBorderIcon key={accomm._id} />
                                    </IconButton>
                                
                                {/* image/s */}
                                { /* reference: https://www.youtube.com/watch?v=McPdzhLRzCg */ }
                                    <div className="img-container">
                                        <div className="slider-wrapper">
                                            <div className="images">
                                                {accomm.photos.map((photo, index) => {
                                                    return <Link to="/accommodation-page"><img id={"image-" + photo + "-" + index} src={require("assets/" + photo)} alt='' /> </Link>
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
        // display results accordingly
        // accommodation not found
        if (fetchedAccomm == false) {
            return (
                <div className="body-div">
                    <Filter />
                    <h3 id="not-found">Accommodation not found</h3>
                </div>
            );
        }

        else {
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
                                        {/* {favBtnState[accomm._id].obj} */}
                                        <BookmarkBorderIcon key={accomm._id} />
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
}