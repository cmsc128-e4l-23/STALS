import React, { useState, useEffect } from "react";
import './index.css' 
import Loading from "../../components/Loading";
import BookmarkBody from "./BookmarkBody";

export default function List({email}){
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API +'getUserBookmarks', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setBookmarks(data.bookmarks)
            }
            setLoading(false)
        });
        
    }, [email, loading])

    return(
        <div>  
            {!loading ? (
                <>
                    {bookmarks.length > 0 ? (
                        <div>
                            <h2>Bookmarked Accommodations:</h2>
                            <ul id="lists">
                                {bookmarks.map((bookmark) => (
                                    <BookmarkBody key={bookmark} bookmark_id={bookmark} email={email} setLoading={setLoading} />
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>No Bookmarked accommodations found</div>
                    )}
                </>
            ) : (
                <Loading />
            )}
        </div>
    )
}
