import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Body from "./Body";
import Loading from '../../components/Loading';


export default function Home() {
    // extract search parameter from the URL
    const [email, setEmail] = useState('')
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searchInput] = useSearchParams();
    let data = searchInput.get("search")===null ? "" : searchInput.get("search");

    useEffect(() => {
        fetch('http://localhost:3001/checkifloggedin', {
        method: 'POST',
        credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setLoggedIn(data.isLoggedIn);
            if(isLoggedIn){
                setEmail(data.email)
            }
            setLoading(false)
        })
    }, [isLoggedIn]);

    return(
        <body>
            {loading ?
            <Loading />
            :
            <Body isLoggedIn={isLoggedIn} email={email} data={data} />

            }
            
        </body>
    );
}
