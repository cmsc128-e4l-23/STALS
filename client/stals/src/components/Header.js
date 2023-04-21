import React, {useState} from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    let navigate = useNavigate();
    const [isSignedIn, setAuth] = useState(false);
    const [userName, setName] = useState('User');

    const [optionsclick, clickOptions] = useState(false);
    const handleClickOptions = () =>{
        clickOptions(!optionsclick);
    }
    
    // Format for Options: {<displaytext>:<link>}
    const [availableOptions, setOptions] = useState({'Add an Accomodation':'/add-accom'});
    // Parameter "option" must be an object and has the format: {Key:"link"}
    const handleOptions = (option,link) => {
        var new_obj;
        new_obj = availableOptions;
        new_obj[option] = link;
        setOptions(new_obj);
    };

    // handleAuth -> sets to True if user is signed in
    // handleName -> sets userName to be the user's name
    const handleAuth = () => {

        // If Login:
        if(!isSignedIn){
            handleOptions('Log Out','/logout');
            delete availableOptions['Sign Up'];
            delete availableOptions['Log In'];
        } else{
            // For logouts
            delete availableOptions['Log Out'];
            console.log(Object.keys(availableOptions));    
        }

        setAuth(!isSignedIn);
    };

    // Will be used when changing user's name for display
    const handleName = (name) => setName(name);

    let auth_section;
    if(isSignedIn){
        auth_section = <div id='auth-confirmed'>Welcome back, <b>{userName}!</b>
        <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
        </ul>
        </div>;
    } else{
        auth_section = <><button id='btn-login' onClick={() => {navigate('/login')}}>LOG IN</button><button id='btn-signup' onClick={() => {navigate('/signup')}}>SIGN UP</button></>;
    };

    // Handles the responsiveness for buttons (what buttons inside the options button will appear at a certain window size)
    const windowResize = () =>{

        if(window.innerWidth>1200){
            delete availableOptions['Sign Up'];
        }

        if(window.innerWidth<1200){

            if(!isSignedIn){
                handleOptions('Sign Up','/signup')
            }

            delete availableOptions['Log In'];

        } 
        if (window.innerWidth<640){

            if(!isSignedIn){
                handleOptions('Log In','/login');
            }
        }
    };
    window.addEventListener('resize',windowResize);

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
                
                <button id='more-options' onClick={handleClickOptions}><FontAwesomeIcon icon={faEllipsis}/></button>
                {optionsclick ? <div id='options-menu'>
                    <ul>
                        {Object.keys(availableOptions).map((option)=>{
                            return <li id='option-btn' onClick={() => {navigate(availableOptions[option])}}>{option}</li>
                        })}
                    </ul>
                </div> : null}

                <div className='auth-sect'>{auth_section}</div>
            </div>
        </div>

        <button onClick={handleAuth}>simulate authentication</button>

    </div>
    )
}