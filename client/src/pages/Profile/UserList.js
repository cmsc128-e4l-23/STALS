import React, { useState, useEffect } from "react";
import DeleteButton from "../ListAccomm/DeleteButton";
import '../ListAccomm/index.css' 
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

    return (
        <div>
          {!loading ? (
            <>
              {bookmarks.length > 0 ? (
                <div style={{ marginTop: "30px" }}>
                  <h2 style={{marginBottom:"100px"}}>Bookmarked Accommodations:</h2>
                  <div className="grid-container">
                    {bookmarks.map((bookmark) => (
                      <div key={bookmark} className="grid-item">
                        <BookmarkBody bookmark_id={bookmark} email={email} setLoading={setLoading} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>No Bookmarked accommodations found</div>
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
      );
      
}