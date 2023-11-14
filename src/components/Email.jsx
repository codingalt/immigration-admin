import React from 'react'
import SideNavbar from './SideNavbar'
import Emailbannerimg from "../assests/Email-banner-img.png"
import "../style/Email.css"
import Avector from "../assests/A-vector.png"
import fileshare from "../assests/file-share-svg.png"
import emoji from "../assests/emoji-svg.png"
import gallary from "../assests/gallary-svg.png"
import threedot from "../assests/three-dot-svg.png"
import del from "../assests/delete-svg.png"

const Email = () => {
  return (
    <div className='email-main-container'>
    <SideNavbar/>
    <h2 className='Message-heading'>Message</h2>
    <div className='Email-banner'>
   <img src={Emailbannerimg} alt="" />
    </div>
    <div className='Email-form'>
      
      <div className='to-text'>
       <input type="text" placeholder='To' className='To-heading' /> 
        <div className='border'></div>
      </div>

      <div className='subject-text'>
      <input type="text" placeholder='Subject' className='subject-heading' /> 
        <div className='border-2'></div>
      </div>

        <div className='last-portion'>
        <div className='border-3'></div>
        <button className='send-btn'>send</button>
        <div className='files-img'>
        <img src={Avector} alt="" className='All-images-1' />
        <img src={fileshare} alt=""  className='All-images-2' />
        <img src={emoji} alt=""  className='All-images-3' />
        <img src={gallary} alt=""   className='All-images-4' />
        <img src={threedot} alt=""  className='All-images-5' />
        <img src={del} alt="" className='delete-svg' />
        </div>
        </div>
    </div>
    <div className='typing'>
      <p className='Jhon-name'>John Leo</p>
      <p className='typing-indicator'>Typing</p>
    </div>
    </div>
  )
}

export default Email