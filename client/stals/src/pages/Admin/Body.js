import React from 'react';
import './admin.css';
import AnalyticsBanner from 'pages/Data-Analytics/Banner';

const Body = () => {
    return (
        <div className='admin-container'>
        <AnalyticsBanner />
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