import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import List from './List';
import Header from "components/Header";
import "./index.css";
import Loading from "components/Loading";


export default function AccommodationList(){
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [loading, setLoading] = useState(true);

    const [isLoggedIn, setLoggedIn] = useState(null);
    useEffect(() => {
        try{
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
                        <div id='user-info'>
                            {name}'s Accommodations
                        </div>
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