import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AccommBody from "./AccommBody";
import Loading from '../../components/Loading';
import Cookies from "universal-cookie";


export default function AccommodationPage() {
    // extract search parameter from the URL
    const cookies = new Cookies();
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState('')
    const [loading, setLoading] = useState(true)

    const [searchInput] = useSearchParams();
    let data = searchInput.get("id")===null ? "" : searchInput.get("id");
    // let id = props.location.state.id;
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
            setLoggedIn(data.isLoggedIn)
            setEmail(data.email)
            setUserType(data.usertype)
            setLoading(false)
        })
      }, []);
    
    
    
    return(
        <body>
          {loading ?
            <Loading />
            :
            <AccommBody data={data} email={email} userType={userType} isLoggedIn={isLoggedIn} />
          }
        </body>
      
    );
}
