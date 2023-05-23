import 'App.css';
import Home from 'pages/Home/index';
import LogIn from 'pages/Login/index';
import SignUp from 'pages/Signup/index';
import AddAccommodation from'pages/Add-Accommodation/index';
import AccommodationList from 'pages/Accommodation-List/index';
import AdminPage from 'pages/Admin';
import DataAnalytics from 'pages/Data-Analytics';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [timerStatus, setTimer] = useState(false);

  const incNumVisits = () => {
    console.log("in incNumVisits");
    const date = new Date();
    fetch('http://localhost:3001/incNumVisits', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
      }),
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then(res => res.json())
      .then(body => {
        if (body.success) {
          console.info(body.msg);
        } else console.error(body.error);
      })
  }
  
  // runs twice because of these possible reasons: 
  // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
  useEffect(() => {
    if (timerStatus==false) {
      setTimer(true);
      setTimeout(incNumVisits, 60000); // incNumVisits when user stayed for at least 1 minute
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home data={""} />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-accommodation" element={<AddAccommodation  />} />
          <Route path="/your-accommodations" element={<AccommodationList />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/data-analytics" element={<DataAnalytics />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
