import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import List from './List';
import Loading from "components/Loading";


export default function BookmarkList(){
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isLoggedIn, setLoggedIn] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3001/checkifloggedin', {
            method: 'POST',
            credentials: 'include'
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