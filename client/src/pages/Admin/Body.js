import React from 'react';
import './admin.css';

const Body = () => {
    return (
        <div className='admin-container'>
        <div className="container">
          <h2>Site Traffic</h2>
        </div>
        <div className="container">
          <h2>A</h2>
        </div>
        <div className="container">
          <h2>B</h2>
        </div>
        <div className="container">
          <h2>C</h2>
        </div>
        <div className="container">
          <h2>D</h2>
        </div>
        <div></div> <div className='separator'></div> 
            <div className="app-container">
                <h2>Application 1</h2>
                <div className="button-container-left">
                    <button className="accept">Accept</button>
                </div>
                <div className='button-container-right'>
                    <button className="decline">Decline</button>
                </div>
            </div>
        
            <div className="app-container">
            <h2>Application 2</h2>
            <div className="button-container-left">
                    <button className="accept">Accept</button>
                </div>
                <div className='button-container-right'>
                    <button className="decline">Decline</button>
                </div>
        </div>
      </div>
    );
  };



export default Body;