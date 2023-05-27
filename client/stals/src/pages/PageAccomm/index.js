import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "components/Header";
import AccommBody from "./AccommBody";


export default function AccommodationPage() {
    // extract search parameter from the URL
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [searchInput] = useSearchParams();
    let data = searchInput.get("id")===null ? "" : searchInput.get("id");
    // let id = props.location.state.id;
    useEffect(() => {
        fetch('http://localhost:3001/checkifloggedin', {
          method: 'POST',
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
          setLoggedIn(data.isLoggedIn);
        })
      });

    return(
        <AccommBody data={data} isLoggedIn={isLoggedIn} />
    );
}
