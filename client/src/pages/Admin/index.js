import React, {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import Body from './Body';
import Cookies from "universal-cookie";


const AdminPage = () => {
  const cookies = new Cookies();
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

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
      if(data.isLoggedIn && data.usertype === "Admin"){
        setAdmin(true)
      }
      setLoading(false)
    })
  });
  return (
  <body>
    {
      loading ? 
      <Loading />
      :
      <>
        { isAdmin ? 
          <Body/>
          :
          <h2>404 not found</h2>
        }
      </>
    }
  
  </body>
    
    
  );
};

export default AdminPage;