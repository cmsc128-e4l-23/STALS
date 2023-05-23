import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import List from './List';
import Header from "components/Header";
import "./index.css";


export default function AccommodationList(){
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
                    setName(localStorage.getItem('username'));
                    setEmail(localStorage.getItem('email'));
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
        <div id="accomm-list">
        <header>
            <Header />
        </header>
        <body>
        {
            loading ?
            <div>
            
                Loading
            </div> :
            <div>
                <h1>
                    {name}'s Accommodations
                </h1>
                <div>
                    <List email={email}/>
                </div>
            </div>
        }
        </body>
        
        </div>
    );
}