import React from 'react';
import Cookies from "universal-cookie";

export default class LogIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            validLogIn: false
        }
        this.login = this.login.bind(this);
    }

    login(e){
        e.preventDefault();
        
        const credentials = {
            email: document.getElementById("l-email").value,
            password: document.getElementById("l-password").value
        }

        //Send a POST request
        fetch(
            "http://localhost:3001/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            .then(response => response.json())
            .then(body => {
                if(!body.success) { 
                    alert(body.prompt); }
                else{
                    // Successful log in. store the token as a cookie   
                        const cookies = new Cookies();
                    cookies.set(
                        "authToken",
                        body.token,
                        {
                            path: "localhost:3001/",
                            age: 60*60,
                            sameSite: "lax"
                        });
                    
                    localStorage.setItem("email", body.email);
                    alert("Successfully logged in");
                    this.setState({ validLogIn: true });

                }
            })
    }
    

    checkifloggedin(e){
        e.preventDefault();
        fetch("http://localhost:3001/checkifloggedin",
        {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(body => {
            if(body.isLoggedIn) {
                console.log(body);
            } else {
                console.log(body);
            }
        });
    }

    render(){
        if(this.state.validLogIn){
            return (
                <div>
                    <button id="CheckButton" onClick={this.checkifloggedin}>Check</button>
                </div>
            )
        } else{
            return(
                <div id="LogInBox">
                    <h1>Log In</h1>
                    <form>
                        <input type="text" id="l-email" placeholder="Email" />&nbsp;
                        <input type="password" id="l-password" placeholder="Password" />&nbsp;
                        <button id="LogInButton" onClick={this.login}>Log In</button>
                    </form>
                </div>
            )
        }
    }
}