import React, { useState, useEffect } from "react";
import List from './List';
import Loading from '../../components/Loading';
import Cookies from "universal-cookie";


export default function BookmarkList(){
    let cookies = new Cookies();
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

        if (isLoggedIn) {
            fetch(process.env.REACT_APP_API + 'getUserBookmarks', {
                method: 'POST',
                body: JSON.stringify({
                    user: email,
                }),
                headers: {
                    'Content-Type': "application/json"
                }
            })
            .then(res => res.json())
            .then(body => {
                if(body.success){
                    console.log(body.bookmarks)
                    setBookmarks(body.bookmarks)
                }
            })
        }
    }, [isLoggedIn]);

    return(
        <div>
        {
            
            loading ?
            
            <Loading /> :
            <>
                {userType === "Student" ?
                    <>
                        {name}'s Bookmarks
                        <div>
                            <List isLoggedIn={isLoggedIn} userType={userType} bookmarks={bookmarks} email={email}/>
                        </div>
                    </>
                    :
                    <h1>404 not found</h1>
                }
            </>
        }
        </div>
    );
}