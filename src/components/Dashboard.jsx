import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';
import SectionA from './SectionA';
import SectionB from './SectionB';
import Notification from './Notification';
import Dashbaordheadinf from './Dashbaordheadinf';
import "../style/Dashbaord.css"
import { useTimeLeftQuery } from '../services/api/adminApi';

const Dashboard = ({getData}) => {

  return (
    <div className="Dashboard-Container">
      <SideNavbar getData={getData} />
      <div className="threeinone-section">
        <TopNavbar />
      </div>
      <div className="hjk">
        <SectionA />
      </div>
      <div className="kjkmm">
        <SectionB />
      </div>
      <div className="fdf">
        <Dashbaordheadinf />
      </div>
    </div>
  );
}

export default Dashboard;
