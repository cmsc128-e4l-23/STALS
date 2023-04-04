import { React, useState } from "react";
import "./Body.css";
import Filter from "./Filter";
import { Favorite, FavoriteBorderRounded } from '@mui/icons-material/';
import { IconButton } from '@mui/material';


// install dependencies for favorite (and other) icons
// Material UI Icons
// npm install @mui/material @emotion/react @emotion/styled 
// npm install @mui/icons-material

export default function Body() {
    // get the images from ./src/img/ -----------
    // temporary
    function importAll(r) {
        let images = [];
        r.keys().forEach((image) => {
            image = image.replace("./", "");
            images.push(image)
        });
        return images;
    }
    const images = importAll(require.context('../img/', false, /\.(png|jpe?g|svg)$/));
    // --------------------------------------------

    // favorite button
    // when not in favorites: <FavoriteBorderRounded />
    // when in favorites: <Favorite />

    // initialize favorite buttons
    // temporary
    const initFavBtn = () => {
        var states = {};
        images.forEach((value, index) => {
            states[index] = {value: false, obj: <FavoriteBorderRounded key={index} />};
        });
        return states;
        
    }
    
    const [favBtnState, updateFavBtnState] = useState(initFavBtn());
    
    // changes the state of the button on click
    // NOT WORKING
    // needs editing 
    const clickFavBtn = (index) => {
        var state = favBtnState;
        // change boolean value
        // true : clicked
        // false : not clicked
        state[index].value = !state[index].value;

        // changing icon
        if (state[index].value) {
            state[index].obj = <Favorite key={index} />;
        } else {
            state[index].obj = <FavoriteBorderRounded key={index} />;
        }
        updateFavBtnState(state);

        // prints icon type
        console.log(favBtnState[index].obj.type.type.render.displayName);
    }

    return (
        // the whole body
        <div className="body-div">
            {/* filter component */}
            <Filter />
                {/* body-container: contains the category title and the accommodation card */}
                <div className="body-container">
                    <h1>Within UPLB Vicinity</h1>
                {/* body-group: multiple body-elements */}
                {/* body-element: image and button/s */}
                    <div className="body-group">
                        {images.map((image, index) => {
                            return <div key={index} className="body-element">

                                    {/* favorite button */}
                                    <IconButton onClick={() => clickFavBtn(index)} className="favorite" >
                                        {favBtnState[index].obj}
                                    </IconButton>
                                
                                    {/* image */}
                                    <img src={require("../img/" + image)} />
                                    
                                    {/* details */}
                                    <div className="details">
                                        <h3>Name</h3>
                                        <p>Location</p>
                                        <p>More details..</p>
                                        <em>Price</em>
                                    </div>
                                    </div>
                            })}
                    </div>
                </div>
                <div className="body-container">
                    <h1>Outside UPLB</h1>
                    <div className="body-group">
                        {images.map((image, index) => {
                                return <div key={index} className="body-element">
                                    <IconButton onClick={() => clickFavBtn(index)} className="favorite" >
                                    {favBtnState[index].obj}
                                    </IconButton>
                                    <img src={require("../img/" + image)} />
                                    {/* details */}
                                    <div className="details">
                                        <h3>Name</h3>
                                        <p>Location</p>
                                        <p>More details..</p>
                                        <em>Price</em>
                                    </div>
                                    </div>
                            })}
                    </div>
                </div>
                <div className="body-container">
                    <h1>Other Accommodations</h1>
                    <div className="body-group">
                        {images.map((image, index) => {
                                return <div key={index} className="body-element">
                                    <IconButton onClick={() => clickFavBtn(index)} className="favorite" >
                                    {favBtnState[index].obj}
                                    </IconButton>
                                    <img src={require("../img/" + image)} />
                                    {/* details */}
                                    <div className="details">
                                        <h3>Name</h3>
                                        <p>Location</p>
                                        <p>More details..</p>
                                        <em>Price</em>
                                    </div>
                                    </div>
                            })}
                    </div>
                </div>
            </div>
    );
}