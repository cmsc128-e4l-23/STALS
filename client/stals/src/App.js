import './App.css';
import Home from './pages/Home';
//import Login from './pages/Login'; used to check the login page
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
