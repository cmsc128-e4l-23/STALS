import React, { useEffect } from "react";
import { useState } from "react";
import  './profile.css';
const OwnerPage = ({ user }) => {
    const [image, setImage] = useState("https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg")
    // const[imageArray, setImageArray] = useState(["https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg","https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg","https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg","https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg","https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"])
    
    const [imageArray, setImageArray] = useState(null);
    const [bookmarksArray, setBookmarksArray] = useState(null);

    useEffect(() => {
        const fetchOwnedAccomms = async () => {
            const response = await fetch('http://localhost:3001/getOwnerAccomms', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email: user.email }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            if (response.success){
                setImageArray(json.accommodations);
            }
        }

        const fetchBookmarks = async () => {
            const response = await fetch('http://localhost:3001/getUserBookmarks', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email: user.email }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            if(response.success){
                setBookmarksArray(json.accommodations);
            }
        }

        fetchOwnedAccomms();
        fetchBookmarks();
    }, [imageArray, bookmarksArray])


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
                    <ol>
                    <li>{ user.name }</li>  
                    <li>email</li>
                    <li>number</li>
                    </ol>
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
                </div>
                
        </div>
    );
};

export { OwnerPage };
