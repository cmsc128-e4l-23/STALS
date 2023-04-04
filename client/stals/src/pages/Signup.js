import React from 'react';
import '../components/Signup.css'

function Signup() {
  return (
    <div className="signup-container">
      <h1>SIGNUP</h1>
      <form className="signup-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;