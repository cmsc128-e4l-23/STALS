import React from "react";
import { useState, useEffect } from "react";
import Header from "components/Header";
import { UserPage } from "./user_profile";
import { OwnerPage } from "./owner_profile";

export default function Profile() {
  const data = []; // put the user data here
  // Example condition: isAdmin determines whether to show admin page or user page

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [usertype, setUserType] = useState('');

  const [isLoggedIn, setLoggedIn] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {

    fetch('http://localhost:3001/checkifloggedin', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.isLoggedIn) {
          setLoggedIn(data.isLoggedIn);
          setName(data.name);
          setEmail(data.email);
          setUserType(data.usertype);
          if (usertype === "Owner") setIsOwner(true)
        }
      })
  }

    , [isLoggedIn]);

  return (
    <div>
      {isOwner ? <OwnerPage /> : <UserPage data={data} />}
    </div>
  );
}

export { Profile };
