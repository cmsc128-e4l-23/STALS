import React, { useState } from 'react';
import '../components/Signup.css';
import Header from '../components/Header';

function Signup() {
  // useState hook to store the form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // event handler functions to update the form data as user types
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // async function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // form data to be sent to the backend server
    const data = {
      name: name,
      email: email,
      password: password
    };

    // send the form data to the backend server
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // handle the server response
    if (response.ok) {
      // handle successful signup
    } else {
      // handle signup error
    }
  };

  // render the Signup component
  return (
    <div>
      <Header />
      <div className="signup-container">
        <h1>SIGNUP</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
