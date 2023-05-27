import React from "react";
import Header from "components/Header";
import { UserPage } from "./user_profile";
import { OwnerPage} from "./owner_profile";

export default function Profile() {
  const data = []; // put the user data here
  // Example condition: isAdmin determines whether to show admin page or user page
  const isOwner = true; //boolean to indicate which page will be rendered
  return (
    <div>
      {isOwner?<OwnerPage/>:<UserPage/>}
    </div>
  );
}

export { Profile };
