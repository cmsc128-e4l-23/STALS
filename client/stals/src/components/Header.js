import React, {useState} from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faCirclePlus } from '@fortawesome/free-solid-svg-icons'

function Header() {

    const [isSignedIn, setAuth] = useState(false);
    const [userName, setName] = useState('User');

    // handleAuth -> sets to True if user is signed in
    // handleName -> sets userName to be the user's name
    const handleAuth = () => setAuth(!isSignedIn);
    const handleName = (name) => setName(name);


    let auth_section
    if(isSignedIn){
        auth_section = <div id='auth-confirmed'>Welcome back, <b>{userName}!</b>
        <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
        </ul>
        </div>;
    } else{
        auth_section = <><button>LOG IN</button><button>REGISTER</button></>;
    };

  return (
    <div id='header'>
        
        {/* TODO: ADD ONCLICK FUNCTION */}
        <div id='logo'>
            <h1>STALS</h1>
        </div>

        <div id='search-section'>
            <div id='search-bar'>
                <input id='search-text' type='text' placeholder='What are you looking for?'/>
                <button id='search-submit' type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </div>

        <div id='right-side-btns'>
            <div id='btn-container'>
                <button id='add-accom'>ADD ACCOMODATION</button>
                <div className='auth-sect'>{auth_section}</div>
            </div>
        </div>

        <button onClick={handleAuth}>simulate authentication</button>

    </div>
  )
}

export default Header