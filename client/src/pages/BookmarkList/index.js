import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import List from './List';
import Loading from '../../components/Loading';
import Cookies from "universal-cookie";


export default function BookmarkList(){
    let navigate = useNavigate();
    const cookies = new Cookies();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isLoggedIn, setLoggedIn] = useState(null);
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
            if(data.isLoggedIn){
                setLoggedIn(data.isLoggedIn);
                setName(data.name);
                setEmail(data.email);
                setUserType(data.usertype);
            }
            setLoading(false);
        })   
    }, [navigate, isLoggedIn]);

    return(
        <body>
        {
            
            loading ?
            
            <Loading /> :
            <>
                {userType === "Student" ?
                    <>
                        {name}'s Bookmarks
                        <div id='list-container'>
                            <List email={email}/>
                        </div>
                    </>
                    :
                    <h1>404 not found</h1>
                }
            </>
        }
        </body>
    );
}