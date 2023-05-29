import React, {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import Body from './Body';


const AdminPage = () => {
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/checkifloggedin', {
      method: 'POST',
      credentials: 'include'
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