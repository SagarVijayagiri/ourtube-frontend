import React from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export const Dashboard=()=>{
  const location = useLocation();
  return(
    <div className="dashboard-container">
      <div className="side-nav">
        <div className="profile-container">
          <img alt='logo' src={localStorage.getItem('logourl')} />
          <h2>{localStorage.getItem('channelname')}</h2>
        </div>
        <div className="menu-container">
          <Link to='/dashboard/home' className={location.pathname == "/dashboard/home"?"active-menu-link":"menu-link"}><i className="fa-solid fa-house"></i>Home</Link>
          <Link to='/dashboard/myvideos' className={location.pathname == "/dashboard/myvideos"?"active-menu-link":"menu-link"}><i className="fa-solid fa-video"></i>My Videos</Link>
          <Link to='/dashboard/uploadvideos' className={location.pathname == "/dashboard/uploadvideos"?"active-menu-link":"menu-link"}><i className="fa-solid fa-upload"></i>Upload Videos</Link>
          <Link className="menu-link"><i className="fa-solid fa-right-from-bracket"></i>Logout</Link>
        </div>
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
    )
}