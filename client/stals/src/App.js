import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Accommodation from'./pages/Accommodation-form'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/accomodation-form" element={<Accommodation />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/accomodation-form" />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
