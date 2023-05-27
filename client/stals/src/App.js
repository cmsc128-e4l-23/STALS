import 'App.css';
import Home from 'pages/Home/index';
import LogIn from 'pages/Login/index';
import SignUp from 'pages/Signup/index';
import AddAccommodation from'pages/Add-Accommodation/index';
import AccommodationList from 'pages/ListAccomm/index';
import AccommPage from 'pages/PageAccomm/index';
import AdminPage from 'pages/Admin';
import Profile from './pages/Profile/index';
import Header from './components/Header';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import BookmarkList from 'pages/BookmarkList';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home data={""} />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-accommodation" element={<AddAccommodation  />} />
          <Route path="/your-accommodations" element={<AccommodationList />} />
          <Route path="/accomm" element={<AccommPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/bookmarks" element={<BookmarkList/>} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
