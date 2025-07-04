import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Dashboard = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active-menu-link" : "menu-link";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <div className="side-nav">
        <div className="profile-container">
          <img alt='logo' src={localStorage.getItem('logourl') || 'default-logo.png'} />
          <h2>{localStorage.getItem('channelname')}</h2>
        </div>
        <div className="menu-container">
          <Link to='/dashboard/home' className={isActive("/dashboard/home")}><i className="fa-solid fa-house"></i>Home</Link>
          <Link to='/dashboard/myvideos' className={isActive("/dashboard/myvideos")}><i className="fa-solid fa-video"></i>My Videos</Link>
          <Link to='/dashboard/uploadvideos' className={isActive("/dashboard/uploadvideos")}><i className="fa-solid fa-upload"></i>Upload Videos</Link>
          <Link className="menu-link" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Logout</Link>
        </div>
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};