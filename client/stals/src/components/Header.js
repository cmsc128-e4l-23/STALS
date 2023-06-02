import React, {useState, useEffect} from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Header() {
    let navigate = useNavigate();

    const [userName, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [optionsActive, optionsToggle] = useState(false);
    const [options, setOptions] = useState({});
    const [isLoggedIn, setLoggedIn] = useState(null);
    const [searchInput, setInput] = useState("");
    const [userId, setId] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:3001/checkifloggedin', {
        method: 'POST',
        credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setLoggedIn(data.isLoggedIn);
            if(data.isLoggedIn){
                setId(localStorage.getItem('id'));
                setName(localStorage.getItem('username'));
                setEmail(localStorage.getItem('email'))
            }
        })
    }, []);

    const generateReport = () => {
        fetch('http://localhost:3001/generateRep', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ user: email }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // Check if the response was successful
                if (res.ok) {
                    // Convert the response to a blob
                    return res.blob();
                } else {
                    throw new Error('PDF Report Generation Failed');
                }
            })
            .then((blob) => {
                const now = new Date();                               
                const fileName = `report-${now.toISOString().slice(0, 10)}.pdf`;
                // Create a URL for the blob
                const url = window.URL.createObjectURL(blob);
                // Create a temporary link element
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                // Append the link to the document body
                document.body.appendChild(link);
                // Simulate a click event to trigger the download
                link.click();
                // Clean up the temporary link element
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log(error);
                alert('An error has occurred');
            });
    };
    

    const logout = (e) => {
        e.preventDefault();

        const cookies = new Cookies();
        cookies.remove("authToken");

        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        setLoggedIn(false);
        optionsToggle(false);
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    // called when the search button is clicked
    const search = () => {
        const regex = new RegExp('^ *$'); // regex for spaces only input
        const searchPage = document.createElement('a');
        
        // redirect to search if searchInput is not empty
        if (!regex.test(searchInput))
            searchPage.href = "/home?search=" + searchInput;
        else searchPage.href = "/home";
        document.body.userNameappendChild(searchPage);
        searchPage.click();
    }

    const handleOptions = (option,link) => {
        var new_options;
        new_options = options;
        new_options[option] = link;
        setOptions(new_options);
    };

    let auth_section;
    if(isLoggedIn){
        auth_section = <><div id='auth-confirmed'>Welcome back, <b>{userName}!</b></div></>
    }else{
        auth_section = <><button id='btn-login' onClick={() => {navigate('/login')}}>LOG IN</button><button id='btn-signup' onClick={() => {navigate('/signup')}}>SIGN UP</button></>;
    };

    // Handles the responsiveness for buttons (what buttons inside the options button will appear at a certain window size)
    const windowResize = () =>{
        optionsToggle(false);

        if(!isLoggedIn){
            if(window.innerWidth > 1200){   delete options['Sign Up']; delete options['Log In']; }
            if(window.innerWidth < 1200){   delete options['Log In'];   handleOptions('Sign Up', '/signup');    }
            if(window.innerWidth < 725){    handleOptions('Log In', '/login');  }
        }
    };
    window.addEventListener('resize',windowResize);

    return (
    <div id='header'>
        <div id='logo' onClick={() => navigate('/home')}>
            <h1>STALS</h1>
        </div>

        <div id='search-section'>
            <div id='search-bar'>
                    <input id='search-text' type='text' placeholder='What are you looking for?' onChange={handleInput} value={searchInput} />
                <button id='search-submit' type='submit' onClick={search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </div>
        
        <div id='right-side-btns'>
            <div id='btn-container'>
                <button id='more-options' onClick={ () => { optionsToggle(!optionsActive) }}><FontAwesomeIcon icon={faEllipsis}/></button>
                {optionsActive ? <div id='options-menu'>
                    {isLoggedIn ? 
                        <ul>
                        {   localStorage.getItem("usertype") === "Accommodation Owner" ? 
                            <li id='option-btn' onClick={() => {navigate('/your-accommodations')}}>YOUR ACCOMMODATIONS</li> : <></>
                        }
                            <li id='option-btn' onClick={() => {navigate('/add-accommodation')}}>ADD AN ACCOMMODATION</li>
                            <li id='option-btn' onClick={generateReport}>GENERATE A REPORT</li>
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

