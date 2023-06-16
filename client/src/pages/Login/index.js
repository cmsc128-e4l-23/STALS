import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate();
  const cookies =  new Cookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setLoggedIn(data.isLoggedIn);
      if(data.isLoggedIn){
        navigate('/home')
        navigate(0)
      }
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let credentials = {
      email: email,
      password: password
    }

    fetch(process.env.REACT_APP_API + 'login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        const cookies = new Cookies();
        cookies.set(
          "authToken",
          data.token,
          {
            path: process.env.REACT_APP_API,
            sameSite: "none",
            secure: true,
          }
        )
        navigate('/home')
        navigate(0)
      }else{
        alert(data.error);
      }
    });
  }


  return (
    <body id="login">
      <div className="login-container">
        <h1>LOG IN</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* <label htmlFor="email">Email:</label> */}
          <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          {/* <label htmlFor="password">Password:</label> */}
          <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          
          <button type="submit">Login</button>
        </form>
      </div>
    </body>
  );
}

