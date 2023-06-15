import React, { useState, useEffect } from 'react';
import AccommCard from "./AccommCard";
import "./Body.css";

export default function AccommList({ isLoggedIn, bookmarkList, email, accommList }){
    const [imageList, setImageList] = useState([]);
    return(
        <div className="body-group" 
        id="inside">
            {
                accommList.map((accomm) => {
                    return <AccommCard isLoggedIn={isLoggedIn} bookmarkList={bookmarkList} email={email} accomm={accomm} />
                })
            }
        </div>
    )
}