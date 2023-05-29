import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import List from './List';
import "./index.css";
import Loading from '../../components/Loading';
import Cookies from "universal-cookie";


export default function AccommodationList(){
    let navigate = useNavigate();
    const cookies = new Cookies();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [loading, setLoading] = useState(true);

    const [isLoggedIn, setLoggedIn] = useState(null);
    useEffect(() => {
        try{
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
                    setLoading(false);
                }else{
                    navigate('/home');
                }
            })
        }catch{
            navigate('/home');
        }
        
    }, [navigate, isLoggedIn]);

    return(
        <body>
            {userType === "Accommodation Owner" ?
                <div>
                {
                    
                    loading ?
                    
                    <Loading /> :
                    <div>
                        <h1 id='user-info'>
                            {name}'s Accommodations
                        </h1>
                        <div id='list-container'>
                            <List email={email}/>
                        </div>
                    </div>
                }
                </div>
                :                
                <h1>404 not found</h1>

            }
        </body>
    )
}