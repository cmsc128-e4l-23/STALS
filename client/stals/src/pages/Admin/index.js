import {useState, useEffect} from 'react';
import Header from 'components/Header';
import Body from './Body';


const AdminPage = () => {
  const [isAdmin, setAdmin] = useState(false)

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
    })
  });
  return (
  <body>
  { isAdmin ? 
      <Body/>
      :
      <div>
        <h2>404 not found</h2>
      </div>

      
    }
  </body>
    
    
  );
};

export default AdminPage;