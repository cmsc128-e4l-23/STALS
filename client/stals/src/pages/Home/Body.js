import { React, useState, useEffect, useCallback } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Filter from "components/Filter";
import Accommodation from "components/Accommodation";
import "./Body.css";


export default function Body({ data }) {
    const [isLoggedIn, setLoggedIn] = useState(null);
    const [accommList, udpateAccomm] = useState([]);
    const [bookmarkList, updateBookmark] = useState(null);
    const [fetchedAccomm, updateFetchAccomm] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    
    var data = {
        loggedIn: isLoggedIn,
        bookmark: bookmarkList,
        userInfo: userInfo
    }


    // updates accommodation list (accommList) and whether there are accommodations fetched (fetchedAccomm)
    const updateData = (list) => {
        udpateAccomm(list);

        if (list.length === 0) updateFetchAccomm(false); // empty list, show "Accommodation not found!"
        else updateFetchAccomm(true); // display accommodations
    }

    // fetch user info
    const fetchUserInfo = () => {
        fetch('http://localhost:3001/getUserBasicDetails', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ email: "owner3@gmail.com" }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    const user = body.user;
                    setUserInfo(user);
                    data.userInfo = user;
                    fetchBookmark();
            }
        })
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
                if (body.success) updateData(body.result);
                else udpateAccomm([]);
            })
    }, [data]);

    const fetchBookmark = useCallback(() => {
        fetch('http://localhost:3001/getUserBookmarks', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({email: "owner3@gmail.com"}),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                console.log(body);
                if (body.success) {
                    updateBookmark(body.bookmarks);
                    data.bookmark = bookmarkList;
                } else updateBookmark(null);
        })
    }, [bookmarkList]);

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
                setLoggedIn(body.isLoggedIn);
                data.loggedIn = isLoggedIn
                fetchUserInfo();
            }
            fetchAccomm();
        })
    }, []);

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
                <div className="body-container">
                    <h1>Within UPLB Vicinity</h1>
                    <div id="inside" className="body-group">
                        {accommList.map((accomm) => {
                            if (accomm.generalLocation <= 1000) {
                                return < Accommodation data={data} accomm={accomm} />
                            }
                        })}
                    </div>
                    <h1>Outside UPLB Vicinity</h1>
                    <div id="inside" className="body-group">
                        {accommList.map((accomm) => {
                            if (accomm.generalLocation > 1000) {
                                return < Accommodation data={data} accomm={accomm}  />
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
                    <div className="body-container">
                        <div className="body-group">
                            {accommList.map((accomm) => {
                                return < Accommodation data={data} accomm={accomm} />
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }
}