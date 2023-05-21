import 'App.css';
import Home from 'pages/Home/index';
import LogIn from 'pages/Login/index';
import SignUp from 'pages/Signup/index';
import AddAccommodation from'pages/Add-Accommodation/index';
import AccommodationList from 'pages/Accommodation-List/index';
import AdminPage from 'pages/Admin';
import AccommPage from 'pages/Accommodation-Page/index';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


function App() {
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
          <Route path="/accomm" element={<AccommPage />} />
          <Route path="/admin" element={<AdminPage />} />

        </Routes> 
      </Router>
    </div>
  );
}

export default App;
