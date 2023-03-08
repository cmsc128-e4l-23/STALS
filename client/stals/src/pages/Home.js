import React from "react";
import { Navigate } from "react-router-dom";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            route: null
        }
    }

    render(){
        if(!this.state.route){
            return(
                <div className="Home">
                    <header>Social Media App</header>
                    <button onClick={()=> this.setState({route:"/log-in"})}>Log In</button><button onClick={() => this.setState({route:"/sign-up"})}>Sign Up</button>
                </div>
                )
        }else{
            return(<Navigate to={this.state.route} />)
        }
        
    }
}

export default Home;