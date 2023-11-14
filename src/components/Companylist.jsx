import React, { useRef } from 'react';
import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';
import { Link } from 'react-router-dom';
import '../style/CompanyList.css';

import sponserimg from '../assests/sponserr-img.png';
import certificateimg  from "../assests/certificate-img.png"
import certificatestudes from "../assests/certifacte-studies-img.png"
import clerance from "../assests/clearnce-img.png"
import leaveremain from "../assests/leave-remain-img.png"
import indefinite from "../assests/indefinite-img.png"
import naturalisation from "../assests/naturalisation-img.png"
import eues from "../assests/eeus-img.png"

const Companylist = () => {



    return (
        <div className='comapnayprofile-main-container'>
            <div className='Addcompany-Topnavbar-client-profile-2'>
                <TopNavbar />
            </div>

            <SideNavbar />

            <h2 className='addcompany-profile-heading'>Add New Company</h2>

            <div className='AddingcompanyList-sub-container'>

                <div className='Main-title-heading'>
                    <p className='starts-new-client-heading'>STARTS A NEW CLIENT PROFILE UNDER THE GROUP</p>

                </div>

                <div className='company-box-1'>

                      <Link to="/groupadminphase1">
                    <div className='profile-box-1'>
                    <Link to="/groupadminphase1">
                        <div className='sponser-li'>
                          <img src={sponserimg} alt="" className='company-imgss-1' />
                        </div>
                  
                        <div className='title-space'>
                           <p className='company-titles-1'>Sponsor License</p>

                        </div>
                        </Link>
                    </div>
                    </Link>

                    <div className='profile-box-2'>
                        <div className='sponser-li-2'>
                           <img src={certificateimg} alt=""  className='company-imgss-2' />
                        </div>

                        <div className='title-space-2'>

                        <p className='company-titles-2'>Certificate of Sponsorship</p>

                        </div>

                    </div>


                    <div className='profile-box-3'>
                        <div className='sponser-li-3'>
                      <img src={certificatestudes} alt="" className='company-imgss-3'  />
                        </div>

                        <div className='title-space-3'>

                      <p className='company-titles-3'>Certificate of Acceptance of Studies</p>
                        </div>

                    </div>

                    <div className='profile-box-4'>
                        <div className='sponser-li-4'>
                            <img src={clerance} alt="" className='company-imgss-4'  />
                        </div>

                        <div className='title-space-4'>
                          <p className='company-titles-4'>Entry Clearance</p>

                        </div>

                    </div>

                    <div className='profile-box-1'>
                        <div className='sponser-li'>
                      <img src={leaveremain} alt="" className='company-imgss-5'  />
                        </div>

                        <div className='title-space'>

                      <p className='company-titles-5'>Leave to Remain</p>
                        </div>
                    </div>

                </div>

                <div className='company-box-2'>


            

                    <div className='profile-box-2'>
                        <div className='sponser-li-2'>
                        <img src={indefinite} alt="" className='company-imgss-6'  />
                        </div>

                        <div className='title-space-2'>

                       <p className='company-titles-6'>Indefinite Leave to Remain</p>
                        </div>

                    </div>


                    <div className='profile-box-3'>
                        <div className='sponser-li-3'> 
                            <img src={naturalisation} alt="" className='company-imgss-7' />
                        </div>

                        <div className='title-space-3'>
                          <p className='company-titles-7'>Naturalisation</p>
                        
                        </div>

                    </div>

                    <div className='profile-box-4'>
                        <div className='sponser-li-4'>
                        <img src={eues} alt="" className='company-imgss-8' />
                        </div>

                        <div className='title-space-4'>

                        <p className='company-titles-8'>EEUS Settlement</p>
                        </div>

                    </div>

                    
                    <div className='profile-box-1'>
                        <div className='sponser-li'>
                      <img src={leaveremain} alt="" className='company-imgss-5'  />
                        </div>

                        <div className='title-space'>

                      <p className='company-titles-5'>Others</p>
                        </div>
                    </div>

                </div>




            </div>
        </div>
    )
}

export default Companylist