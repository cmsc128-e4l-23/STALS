import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import List from './List';


export default function AccommodationList(){
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

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
                }else{
                    navigate('/home');
                }
            })
        }catch{
            navigate('/home');
        }
        
    }, [navigate, isLoggedIn]);

    return(
    <>
    <div>
        <div id='user-info'>
            {name}'s Accommodations
        </div>
        <div id='list-container'>
            <List email={email} />
        </div>
    </div>
    </>
    );
}