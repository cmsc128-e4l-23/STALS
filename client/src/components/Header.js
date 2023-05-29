import React, {useState, useEffect} from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Header() {
    let navigate = useNavigate();

    const cookies = new Cookies();
    console.log(cookies.get("authToken"));
    const [name, setName] = useState(null);
    const [userType, setUserType] = useState(null);
    const [optionsActive, optionsToggle] = useState(false);
    const [options, setOptions] = useState({});
    const [isLoggedIn, setLoggedIn] = useState(null);
    const [searchInput, setInput] = useState("");
    const [showOptions, setShowOptions] = useState(true);

    useEffect(() => {
        let credentials = {
          auth: cookies.get("authToken")
        }
        console.log(credentials);
        fetch(process.env.REACT_APP_API + 'checkifloggedin', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(data => {
          setLoggedIn(data.isLoggedIn);
          if(data.isLoggedIn){
            setName(data.name)
            setUserType(data.usertype)
          }
        })

        if(!isLoggedIn){
            if(window.innerWidth < 1200){   
                delete options['Log In'];   
                handleOptions('Sign Up', '/signup'); 
            }

            if(window.innerWidth < 725){    
                handleOptions('Log In', '/login');
            }
        }

        if(window.innerWidth < 1200){
            setShowOptions(true);   
        }
      }, []);

    const logout = (e) => {
        e.preventDefault();

        const cookies = new Cookies();
        cookies.remove("authToken");

        setLoggedIn(false);
        optionsToggle(false);

        navigate("/home");
        navigate(0);
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    // called when the search button is clicked
    const search = (e) => {
        e.preventDefault();
        const regex = new RegExp('^ *$'); // regex for spaces only input
        
        // redirect to search if searchInput is not empty
        if (!regex.test(searchInput)){
            navigate("/home?search=" + searchInput)
            navigate(0)
        }else{
            navigate("/home")
            navigate(0)
        }
    }

    const handleOptions = (option,link) => {
        var new_options;
        new_options = options;
        new_options[option] = link;
        setOptions(new_options);
    };

    let auth_section;
    if(isLoggedIn){
        auth_section = <><div id='auth-confirmed'>Welcome back, <b>{name}!</b></div></>
    }else{
        auth_section = <><button id='btn-login' onClick={() => {navigate('/login')}}>LOG IN</button><button id='btn-signup' onClick={() => {navigate('/signup')}}>SIGN UP</button></>;
    };

    // Handles the responsiveness for buttons (what buttons inside the options button will appear at a certain window size)
    const windowResize = () =>{
        optionsToggle(false);

        if(!isLoggedIn){
            if(window.innerWidth > 1200){   delete options['Sign Up']; delete options['Log In']; setShowOptions(false); }
            if(window.innerWidth < 1200){   delete options['Log In'];   handleOptions('Sign Up', '/signup');  setShowOptions(true); }
            if(window.innerWidth < 725){    handleOptions('Log In', '/login');  }
        }   
    };
    window.addEventListener('resize',windowResize);

    return (
    <div id='header'>
        <div id='logo' onClick={() => {navigate('/home'); navigate(0)}}>
            <h1>STALS</h1>
        </div>

        <div id='search-section'>
            <div id='search-bar'>
                <form>
                    <input id='search-text' type='text' placeholder='What are you looking for?' onChange={handleInput} value={searchInput} />
                    <button id='search-submit' type='submit' onClick={search}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                </form>
            </div>
        </div>
        
        <div id='right-side-btns'>
            <div id='btn-container'>
                {((showOptions || isLoggedIn) && Object.keys(options).length !== 0) && <button id='more-options' onClick={ () => { optionsToggle(!optionsActive) }}><FontAwesomeIcon icon={faEllipsis}/></button>}
                {optionsActive ? <div id='options-menu'>
                    {isLoggedIn ? 
                        <ul>
                        {   userType === "Student" &&
                            <>
                                <li id='option-btn' onClick={() => {navigate('/profile')}}>YOUR PROFILE</li>
                                <li id='option-btn' onClick={() => {navigate('/your-bookmarks')}}>YOUR BOOKMARKS</li>
                            </>
                        }
                        {   userType === "Accommodation Owner" && 
                            <>
                                <li id='option-btn' onClick={() => {navigate('/profile')}}>YOUR PROFILE</li>
                                <li id='option-btn' onClick={() => {navigate('/your-accommodations')}}>YOUR ACCOMMODATIONS</li>
                                <li id='option-btn' onClick={() => {navigate('/add-accommodation')}}>ADD AN ACCOMMODATION</li>
                            </>
                        }
                        {   userType === "Admin" &&
                            <>
                                <li id='option-btn' onClick={() => {navigate('/admin')}}>ADMIN DASHBOARD</li>
                            </>
                        }
                            
                            <li id='option-btn' onClick={logout}>LOG OUT</li>
                        </ul> :
                        <ul>
                            {Object.keys(options).map((option)=>{
                                return <li id='option-btn' onClick={() => {navigate(options[option])}}>{option}</li>
                            })}
                        </ul>
                        
                    }
                </div> : null}
            </div>
            <div className='auth-sect'>{auth_section}</div>
        </div>
    </div>
    )
}