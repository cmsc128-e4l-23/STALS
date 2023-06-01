import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css";
import Loading from '../../components/Loading';
import Cookies from "universal-cookie";
import { OwnerPage } from "./owner_profile";
import { UserPage } from "./user_profile";


export default function Profile(){
    let navigate = useNavigate();
    const cookies = new Cookies();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
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
                    fetch(process.env.REACT_APP_API + 'getUserBasicDetails', {
                      method: 'POST',
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(
                        {
                            email:email
                        }
                    )
                    }).then(res => res.json(
                      
                    ))
                    .then(data=>{
                      if(data.success){
                        setNumber(data.user.phoneNumber)
                      }
                    })

                    setLoading(false);
                }else{
                    navigate('/home');
                }
            })
        }catch{
            navigate('/home');
        }
        
    }, [navigate, isLoggedIn]);

  return (
    <div>
    { loading ?
      <h3> Loading . . . . </h3>
      :
      <>
      {userType === "Accommodation Owner" ? <OwnerPage email={email} name={name} number={number}  /> : <UserPage email={email} name={name} number={number}  />}
      </>
    }
    </div>
  );
}

export { Profile };
