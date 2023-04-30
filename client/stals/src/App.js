import 'App.css';
import Home from 'pages/Home/index';
import LogIn from 'pages/Login/index';
import SignUp from 'pages/Signup/index';
import AddAccommodation from'pages/Add-Accommodation/index';

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
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
