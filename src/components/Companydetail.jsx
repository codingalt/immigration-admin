import React, { useEffect, useState, useRef } from 'react';
import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';
import "../style/tablelistid.css"
import { Link , NavLink } from 'react-router-dom';

const Companydetail = () => {
    const handleAddProfileClick = () => {
        // Add your logic here for what should happen when the button is clicked
        // For example, you can navigate to a profile creation page or perform any other action.
      };


    return (
        <div className='comapnayprofile-main-container'>
                <div className='Addcompany-Topnavbar-client-profile-2'>
                    <TopNavbar />
                </div>
    
                <SideNavbar />


    
                <h2 className='changepassword-profile-heading'>LeSoft Pvt Ltd Cases</h2>
                <Link to="/companylist">
                <button className='Case-profile-addbtn' onClick={handleAddProfileClick}>Create New Case</button>
                </Link>
                <div className='table-list-sub-container'>
    
                <table>
    
    
    
    <tr className='Table-heading'>
      <td>Case ID</td>
      <td>Name</td>
      <td>Email</td>
      <td>Contact</td>
      <td>Date of Birth</td>
      <td>Country</td>
      <td>Action</td>
    </tr>
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td>
      <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link>
      </td>
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
    
      <td>
      <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link>
      </td>
    
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td> <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link></td>
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td> <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link></td>
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td> <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link></td>
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td> <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link></td>
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td> <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link></td>
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td> <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link></td>
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td> <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link></td>
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td> <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link></td>
    </tr>
    
    <tr>
      <td>001</td>
      <td>John Leo</td>
      <td>John@gmail.com</td>
      <td>(485)-845-8542658</td>
      <td>9-21-2023</td>
      <td>United Kingdom</td>
      <td> <Link to="/dashboard">
      <button className='View-btn-tablelist'>View</button>
      </Link></td>
    </tr>
    
    </table>
                </div>
            </div>
      )
    }

export default Companydetail