import 'App.css';
import Home from 'pages/Home/index';
import LogIn from 'pages/LogIn/index';
import SignUp from 'pages/SignUp/index';
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
