import React from "react";
import AccommCard from "./AccommCard";
import "./Body.css";

export default function AccommList({ isLoggedIn, userType, bookmarkList, email, accommList }){

    return(
        <div className="body-group" 
        id="inside">
            {
                accommList.map((accomm) => {
                    return <AccommCard isLoggedIn={isLoggedIn} userType={userType} bookmarkList={bookmarkList} email={email} accomm={accomm} />
                })
            }
        </div>
    )
}