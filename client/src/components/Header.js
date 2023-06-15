import React, {useState, useEffect} from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Header() {
    let navigate = useNavigate();

    const cookies = new Cookies();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
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
            setEmail(data.email)
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

    const generateReport = () => {
        fetch(process.env.REACT_APP_API + 'generateRep', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ user: email }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            // Check if the response was successful
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('PDF Report Generation Failed');
            }
        })
        .then((data) => {
            if (data.success) {
                const now = new Date();                               
                const fileName = `report-${now.toISOString().slice(0, 10)}.pdf`;
                const pdfData = data.pdfData;
                
                // Create a temporary link element
                const link = document.createElement('a');
                link.href = `data:application/pdf;base64,${pdfData}`;
                link.setAttribute('download', fileName);
                link.style.display = 'none';
                
                // Append the link to the document body
                document.body.appendChild(link);
                
                // Simulate a click event to trigger the download
                link.click();
                
                // Clean up the temporary link element
                document.body.removeChild(link);
            } else {
                alert('User has no bookmarks');
            }
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
    if (isLoggedIn) {
        let displayName = name.length > 10 ? `${name.slice(0, 20)}...` : name;
        auth_section = (
          <>
            <div id='auth-confirmed'>
              Welcome back, <b>{displayName}!</b>
            </div>
          </>
        );
      }
      else{
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
                    <FontAwesomeIcon icon={faMagnifyingGlass} />

                    </button>
                </form>
            </div>
        </div>
        
        <div id='right-side-btns'>
            <div id='btn-container'>
                {((showOptions && Object.keys(options).length !== 0) || isLoggedIn)  && <button id='more-options' onClick={ () => { optionsToggle(!optionsActive) }}><FontAwesomeIcon icon={faEllipsis}/></button>}
                {optionsActive ? <div id='options-menu'>
                    {isLoggedIn ? 
                        <ul>
                        {   userType === "Student" &&
                            <>
                                <li id='option-btn' onClick={() => {navigate('/profile')}}>YOUR PROFILE</li>
                                <li id='option-btn' onClick={() => {navigate('/your-bookmarks')}}>YOUR BOOKMARKS</li>
                                <li id='option-btn' onClick={generateReport}>GENERATE A REPORT</li>
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