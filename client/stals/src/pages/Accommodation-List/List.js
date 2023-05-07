import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton.";






export default function List({email}){
    const [accomms, setAccomms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/getOwnerAccomms', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            setAccomms(data.accommodations)
        });
    }, [email])
    return(
        <>
        {accomms && accomms.map((accomm) => <li>{accomm.name}<DeleteButton accommodation={accomm} setAccomms={setAccomms} /></li>)}
        </>
    )
}