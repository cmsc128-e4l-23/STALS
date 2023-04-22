import React, { useState } from 'react';
import '../components/Signup.css'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  let navigate = useNavigate();

  const [usertype, setUserType]  = useState('Student');
  const [fname, setFName]  = useState('');
  const [lname, setLName]  = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [sex, setSex] = useState('Male');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      userType: usertype,
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
      sex: sex,
      phoneNumber: contact,
      birthday: birthday
    }
    fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
    })
    .then(res => {
      if(res.status === 201){
        alert("Successfully signed in " + res.email);
        navigate('/login');
      }
    });
    
  }
  return (
    <div className="signup-container">
      <Header />
      <h1>SIGNUP</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <select id="type" name="type" value={usertype} onChange={(e) => setUserType(e.target.value)} required>
          <option value="Student">Student</option>
          <option value="Accommodation Owner">Accommodation Owner</option>
        </select>
        
        <label htmlFor="name">First Name:</label>
        <input type="text" id="fname" name="fname" placeholder="Enter your name" value={fname} onChange={(e) => setFName(e.target.value)} required />
        
        <label htmlFor="name">Last Name:</label>
        <input type="text" id="lname" name="lname" placeholder="Enter your name" value={lname} onChange={(e) => setLName(e.target.value)} required />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <label htmlFor="password">Contact Number:</label>
        <input type="number" id="contact" name="contact" placeholder="Enter your contact number" value={contact} onChange={(e) => setContact(e.target.value)} required />
        
        <label htmlFor="sex">Sex:</label>
        <select id="type" name="type" value={sex} onChange={(e) => setSex(e.target.value)} required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="password">Birthday:</label>
        <input type="date" id="birthday" name="birthday" placeholder="Enter your birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

