import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AccommBody from "./AccommBody";
import Loading from '../../components/Loading';


export default function AccommodationPage() {
    // extract search parameter from the URL
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState('')
    const [loading, setLoading] = useState(true)

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
