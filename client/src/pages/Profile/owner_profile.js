import React, { useEffect } from "react";
import { useState } from "react";
import  './profile.css';
import List from './Owner_List.js'
const OwnerPage = ({ email, name, number }) => {
    const [image, setImage] = useState("https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg")
    // const[imageArray, setImageArray] = useState(["https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg","https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg","https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg","https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg","https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"])
    
    const [accomms, setAccomms] = useState(true);
    const [imageArray, setImageArray] = useState([]);
    const [bookmarksArray, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    //Getting fetched owned accommodations
    useEffect(() => {
        const fetchOwnedAccomms = async () => {
            const response = await fetch(process.env.REACT_APP_API+'getOwnerAccomms', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email: email }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            console.log("ETO UNG JSON = ",json);
            if (response.success){
                setImageArray(json.accommodations);
                setLoading(false);
            }
        }

    }, [imageArray, bookmarksArray])

    // //Getting user bookmarks for favorites list

    //Profile Picture changer
        //Enables the profile picture to be clicked for modifications
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileString = e.target.result;
            setImage(fileString);
            console.log("Image state updated:", image);
        };
        if (file) {
            reader.readAsDataURL(file); // Add this line to read the file contents
        }
    }

    //Render Page
    return (
        <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "column", width: "400px"}}>
                    <div>
                        <label for="file-upload">
                            <img src={image} alt="Clickable Image" style={{ width: "90%", height: "100%", borderRadius: "50%" }}></img>
                        </label>
                        <input id="file-upload" type="file" style={{ display: "none" }} accept="image/*" onChange={handleImageChange}></input>
                    </div>
                    <ul>
                    <li>Name: {name}</li>  
                    <li>Email: {email}</li>
                    <li>Number: {number}</li>
                    </ul>
                </div>
                <div>
                <div><h4>My Accommodations</h4></div>
                <div class="image-grid">
                {imageArray.map((img,index)=>(
                    <a href={"http://localhost:3000/home"}>
                        <img src={img} alt="myFavorites"></img>
                    </a>
                    
                )
                )}
                </div>
                <List email = {email}/>
                </div>
                
        </div>
    );
};

export { OwnerPage };
