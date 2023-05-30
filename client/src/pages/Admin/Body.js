import React from 'react';
import './admin.css';
import AdminLog from './AdminLog';
import AnalyticsBanner from '../Data-Analytics/Banner';

const Body = () => {
    return (
      <div className='admin-container'>
          <AnalyticsBanner />
          <AdminLog />
      </div>
    );
  };



export default Body;