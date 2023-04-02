import React, { Component } from "react";
import { Navigate } from "react-router-dom";        
import Cookies from "universal-cookie";
import Posts from "../../../../../../CMSC 100 Reference/exercise-10-web-application-using-reactjs-and-expressjs-amtuazon4/TUAZONAM_exer10/frontend/src/pages/moreComponents/Posts";
import "../Style.css";

export default class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkedIfLoggedIn: false,
            isLoggedIn: null,
            email: localStorage.email,
            editpost: false,
            gonnaSearch: false,
            getFriends: false
        }
    
    }

    componentDidMount(){
        //Send POST request to check if user is logged in
        fetch("http://localhost:3001/checkifloggedin",
        {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(body => {
            if(body.isLoggedIn) {
                this.setState({ checkedIfLoggedIn: true, isLoggedIn: true})
            } else {
                this.setState({ checkedIfLoggedIn: true, isLoggedIn: false });
            }
        });

    }

    logout(e){
        e.preventDefault();

        //Delete cookie with authToken
        const cookies = new Cookies();
        cookies.remove("authToken");

        //Delete username in local storage
        localStorage.removeItem("email");

        this.setState({ isLoggedIn: false });
    }


    addPost(e){
        // let x = document.getElementById("p-value").value;
        // console.log(x);

        let post = {
            "email": localStorage.email,
            "timestamp": (new Date()).toString(),
            "content": document.getElementById("p-value").value
        }

        // console.log(post);

        fetch(
            "http://localhost:3001/addPost",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
            .then(response => response.json())
            .then(body => {
                if(body.success) { alert("Successfully saved post"); }
                else { alert("Failed to save post"); }
            })
            document.getElementById("p-value").value = "";
            window.location.reload();
    }

    editPost(e){
        this.setState({editpost: true});
    }

    search(e){
        this.setState({gonnaSearch: true});
    }

    getFriends(e){
        this.setState({ getFriends: true });
    }

    

    render() {
        if(!this.state.checkedIfLoggedIn) {
            //delay redirect/render
            return(<div></div>)
        }else{
            return(<div>hellow</div>)
        } 
        
    }


}