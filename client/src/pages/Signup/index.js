import React, { useState } from 'react';

import './Signup.css'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  let navigate = useNavigate();

  const [usertype, setUserType] = useState('Student');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState("");
  const [contact, setContact] = useState('');
  const [sex, setSex] = useState('Male');
  const [birthday, setBirthday] = useState('');
  const [birthdayError, setBirthdayError] = useState("");

  const handleBirthdayChange = (e) => {
    const value = e.target.value;
    setBirthday(value);
    setBirthdayError(validateBirthday(value));
  };

  const validateBirthday = (birthdate) => {
    const today = new Date();
    const inputDate = new Date(birthdate);
    const ageDiff = today.getFullYear() - inputDate.getFullYear();

    if (ageDiff < 13) {
      return "You must be at least 13 years old.";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };
  const validatePassword = (password) => {
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one capital letter.";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (password.length < 10) {
      return "Password must be at least 10 characters long.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageError = validateBirthday(birthday);
    if (ageError) {
      setBirthdayError(ageError);
      return;
    }
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
    let newUser = {
      userType: usertype,
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
      sex: sex,
      phoneNumber: contact,
      birthday: birthday,
    }

    if (usertype === 'Accommodation Owner') {
      newUser = {
        ...newUser, owner: {
          propertiesList: [],
          archivedList: [],
          status: 'active'
        }
      }
    } else if (usertype === 'Admin') {
      newUser = {
        ...newUser, admin: {
          pendingApplications: [],
          pendingReports: []
        }
      }
    }
    fetch(process.env.REACT_APP_API + 'signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          alert("Successfully signed up " + newUser.email);
          navigate('/login');
        }
      })
  }
  return (
    <body>


      <div className="signup-container">
        <h1>SIGNUP</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <select id="type" name="type" value={usertype} onChange={(e) => setUserType(e.target.value)} required>
            <option value="Student">Student</option>
            <option value="Accommodation Owner">Accommodation Owner</option>
          </select>

          <label htmlFor="name">First Name:</label>
          <input type="text" id="fname" name="fname" placeholder="Enter your name" maxLength={30} pattern="[A-Za-z\s]+" value={fname} onChange={(e) => setFName(e.target.value)} required />

          <label htmlFor="name">Last Name:</label>
          <input type="text" id="lname" name="lname" placeholder="Enter your name" maxLength={30} pattern="[A-Za-z\s]+" value={lname} onChange={(e) => setLName(e.target.value)} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" maxLength={30} value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" maxLength={30} value={password} style={{ marginBottom: '0px' }} onChange={handlePasswordChange} required />
          {passwordError ? (
            <div className={`error ${passwordError ? 'blink-red' : ''}`} style={{ marginBottom: '15px' }}>{passwordError}</div>
          ) : (
            <div style={{ marginBottom: '15px' }}></div>
          )}

          <label htmlFor="password">Contact Number:</label>
          <input type="number" id="contact" name="contact" placeholder="Enter your contact number" value={contact} onChange={(e) => setContact(e.target.value)} required />

          <label htmlFor="sex">Sex:</label>
          <select id="type" name="type" value={sex} style={{ marginBottom: '15px' }} onChange={(e) => setSex(e.target.value)} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label htmlFor="password">Birthday:</label>
          <input type="date" id="birthday" name="birthday" placeholder="Enter your birthday" style={{ marginBottom: '0px' }} value={birthday} onChange={handleBirthdayChange} required />
          {birthdayError? (
            <div style={{ marginBottom: '15px' }} className={`error ${birthdayError ? 'blink-red' : ''}`}>{birthdayError}</div>
          ): (
            <div style={{ marginBottom: '15px' }}></div>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </body>
  );
}
