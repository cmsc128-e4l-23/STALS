import './App.css';
import Home from './pages/Home';
import LogIn from './pages/Login';
import SignUp from './pages/Signup';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Accommodation from'./pages/Accommodation-form'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-accommodation" element={<Accommodation  />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
