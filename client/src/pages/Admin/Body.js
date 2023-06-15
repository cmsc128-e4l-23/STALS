import React from 'react';
import './admin.css';
import AdminLog from './AdminLog';
import AnalyticsBanner from '../Data-Analytics/Banner';

const Body = () => {
    const center_styles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // height: '100vh',
    };
  
    return (
      <div className='admin-container'>
          <AnalyticsBanner />
          <AdminLog />
      </div>
    );
  };



export default Body;