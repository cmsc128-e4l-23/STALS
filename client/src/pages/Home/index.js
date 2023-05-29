import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Body from "./Body";
import Loading from '../../components/Loading';
import Cookies from "universal-cookie";


export default function Home() {
    // extract search parameter from the URL
    const cookies = new Cookies();
    const [email, setEmail] = useState('')
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userType, setUserType] = useState('')
    const [loading, setLoading] = useState(true)
    const [searchInput] = useSearchParams();
    let data = searchInput.get("search")===null ? "" : searchInput.get("search");

    useEffect(() => {
        let credentials = {
            auth: cookies.get("authToken")
          }
          fetch(process.env.REACT_APP_API + 'checkifloggedin', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
          })
        .then(res => res.json())
        .then(data => {
            setLoggedIn(data.isLoggedIn);
            if(isLoggedIn){
                setEmail(data.email)
                setUserType(data.usertype)
            }
            setLoading(false)
        })
    }, [isLoggedIn]);

    return(
        <body>
            {loading ?
            <Loading />
            :
            <Body isLoggedIn={isLoggedIn} userType={userType} email={email} data={data} />

            }
            
        </body>
    );
}
