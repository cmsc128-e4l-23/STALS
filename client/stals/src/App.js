import './App.css';
import Home from './pages/Home';
import LogIn from './pages/Login';
import SignUp from './pages/Signup';
//import Login from './pages/Login'; used to check the login page
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
