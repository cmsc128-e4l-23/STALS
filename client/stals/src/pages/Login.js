import React from 'react';
import '../components/Login.css';

function Login() {
    return (
      <div className="login-container">
        <h1>Log In</h1>
        <form className="login-form">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

export default Login;