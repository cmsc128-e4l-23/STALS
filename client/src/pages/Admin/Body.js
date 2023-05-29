import React from 'react';
import './admin.css';
import AdminLog from './AdminLog';

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
    
          <div className='separator'/>
            <AdminLog />
      </div>
    );
  };



export default Body;