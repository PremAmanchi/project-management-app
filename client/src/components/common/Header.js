import React, { useEffect, useRef, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";

import ORG_Logo from '../../images/Org_Logo1.png'
import './Header.css'
import { AppContext } from "../../AppContext";


export default function Header() {
  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);


  const logoutHandler = () => {

    Axios.get(baseurl + "/logout").then((response) => {
      if (response.status == 200) {
        setLoginStatus(false)
        setLoggedinUserDetails({})
      } else {
        console.log(response)
      }
    });

  };
  return (
    <>
      <nav>
        <div className='nav-center'>
          <div className='nav-header'>
            <img src={ORG_Logo} className='logo' alt='logo' />
          </div>
          {loginStatus && <div className='links-container'>
            <ul className='links'>
              <li><NavLink className={activeTab === "projects" ? 'nav-bar-linkactive' : "nav-bar-link"} to="/projects" onClick={() => setActiveTab("projects")}>Projects</NavLink></li>
              <li><NavLink className={activeTab === "users" ? 'nav-bar-linkactive' : "nav-bar-link"} to="/users" onClick={() => setActiveTab("users")}>Users</NavLink></li>
              <li><NavLink className={activeTab === "about" ? 'nav-bar-linkactive' : "nav-bar-link"} to="/about" onClick={() => setActiveTab("about")}>About</NavLink></li>
              <li><NavLink className={activeTab === "contact" ? 'nav-bar-linkactive' : "nav-bar-link"} to="/contact" onClick={() => setActiveTab("contact")}>Contact</NavLink></li>


              <li><div><b><label className="user-details">{loggedinUserDetails?.firstname} {loggedinUserDetails?.lastname}</label></b></div>
                <div><label className="user-details">{loggedinUserDetails?.userrole}</label></div></li>
              <NavLink className="logout-button" to="/logout" onClick={logoutHandler}>Logout</NavLink>
            </ul>
          </div>
          }
        </div>
      </nav>
    </>
  )
}