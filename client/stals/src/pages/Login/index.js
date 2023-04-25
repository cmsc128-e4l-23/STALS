import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import 'components/Login.css';
import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3001/checkifloggedin', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setLoggedIn(data.isLoggedIn);
      if(isLoggedIn){
        navigate('/home');
      }
    })
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let credentials = {
      email: email,
      password: password
    }

    fetch('http://localhost:3001/login', {
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
            path: "localhost:3001/",
            sameSite: "lax"
          }
        );
        localStorage.setItem("username", data.fname);
        localStorage.setItem("email", data.email);
        localStorage.setItem("usertype", data.type)
        
        navigate('/home');
      }
    });
  }


  return (
    <>
      <Header />
      <div className="login-container">
        <h1>Log In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

