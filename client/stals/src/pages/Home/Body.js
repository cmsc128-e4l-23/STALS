import { React, useState, useEffect, useCallback } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AccommCard from "./AccommCard";
import "./Body.css";


export default function Body({ isLoggedIn, email, data }) {
    const [accommList, udpateAccomm] = useState([]);
    const [bookmarkList, updateBookmark] = useState(null);
    const [fetchedAccomm, updateFetchAccomm] = useState(null);
    
    var passData = {
        loggedIn: isLoggedIn,
        bookmark: bookmarkList,
        userEmail: email
    }

    useEffect(() => {
        fetchAccomm();
    }, [])

    // updates AccommCard list (accommList) and whether there are AccommCards fetched (fetchedAccomm)
    const updateData = (list) => {
        udpateAccomm(list);

        if (list.length === 0) updateFetchAccomm(false); // empty list, show "AccommCard not found!"
        else updateFetchAccomm(true); // display AccommCards
    }

    // fetch user's bookmarks if looged in
    const fetchBookmark = useCallback(() => {
        fetch('http://localhost:3001/getUserBookmarks', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({email: email}),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    updateBookmark(body.bookmarks);
                    passData.bookmark = bookmarkList;
                    passData.userEmail = email;
                } else updateBookmark(null);
        })
    }, [passData, email, bookmarkList]);

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
                console.log(body)
                if (body.success) {
                    updateData(body.result);
                }
                else udpateAccomm([]);
            })
    }, [data]);


    // loading
    if (fetchedAccomm == null) {
        return (
            <div className="body-div">
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
                <div className="body-container">
                    <h1>Within UPLB Vicinity</h1>
                    <div id="inside" className="body-group">
                        {accommList.map((accomm) => {
                            if (accomm.generalLocation <= 1000) {
                                return < AccommCard data={passData} accomm={accomm} />
                            }
                        })}
                    </div>
                    <h1>Outside UPLB Vicinity</h1>
                    <div id="inside" className="body-group">
                        {accommList.map((accomm) => {
                            if (accomm.generalLocation > 1000) {
                                return < AccommCard data={passData} accomm={accomm}  />
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
        // AccommCard not found
        if (fetchedAccomm == false) {
            return (
                <div className="body-div">
                    <h3 id="not-found">AccommCard not found</h3>
                </div>
            );
        }
        else {
            // AccommCard found
            return (
                // the whole body
                <div className="body-div">
                    <div className="body-container">
                        <div className="body-group">
                            {accommList.map((accomm) => {
                                return < AccommCard data={passData} accomm={accomm} />
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }
}