import React from "react";
import { useState, useEffect } from "react";
import './profile.css';
const UserPage = ({ user }) => {
    const [userData, setUserData] = useState({});
    const [image, setImage] = useState("https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg")
    const [imageArray, setImageArray] = useState(["https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg", "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg", "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg", "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg", "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"])

    const handleImageChange = (e) => { //this makes the profile picture changeable when clicked
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileString = e.target.result;
            setImage(fileString);
            console.log("Image state updated:", image)
        };
        if (file) {
            reader.readAsDataURL(file); // Add this line to read the file contents
        }

    }

    useEffect(() => {
        fetch('http://localhost:3001/getUserBasicDetails', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ email: user }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    setUserData(body.user)
                } else {
                    alert(body.error);
                }
            })
            .catch((error) => {
                alert("An error has occurred");
            })
    }, []);
    console.log(userData);
    return (
        <div style={{ display: "flex", flexDirection: "row", border: "2px solid green" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "400px", border: "2px solid purple" }}>
                <div>
                    <label for="file-upload">
                        <img src={image} alt="Clickable Image" style={{ width: "90%", height: "100%", borderRadius: "50%" }}></img>
                    </label>
                    <input id="file-upload" type="file" style={{ display: "none" }} accept="image/*" onChange={handleImageChange}></input>
                </div>
                <ol>
                    <li>{userData.firstName}</li>
                    <li>{user}</li>
                    <li>{userData.phoneNumber}</li>
                </ol>
            </div>
            <div>
                <div><h4>My Favorites</h4></div>
                <div class="image-grid">
                    {imageArray.map((img, index) => (
                        <img src={img} alt="myFavorites"></img>
                    )

                    )}
                </div>
            </div>

        </div>
    );
};

export { UserPage };
