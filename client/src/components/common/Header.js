import React, { useEffect, useRef, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";

import ORG_Logo from '../../images/Org_Logo1.png'
import styles from './Header.module.css'
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

    <nav className={styles.navBar}>
      <div className={styles.navCenter}>
        <div className={styles.navLogo}>
          <img src={ORG_Logo} className={styles.logo} alt='logo' />
        </div>
        {loginStatus && <div className={styles.linksContainer}>
          <ul className={styles.links}>
            <li><NavLink className={activeTab === "projects" ? styles.navBarLinkActive : styles.navBarLink} to="/projects" onClick={() => setActiveTab("projects")}>Projects</NavLink></li>
            <li><NavLink className={activeTab === "users" ? styles.navBarLinkActive : styles.navBarLink} to="/users" onClick={() => setActiveTab("users")}>Users</NavLink></li>
            <li><NavLink className={activeTab === "about" ? styles.navBarLinkActive : styles.navBarLink} to="/about" onClick={() => setActiveTab("about")}>About</NavLink></li>
            <li><NavLink className={activeTab === "contact" ? styles.navBarLinkActive : styles.navBarLink} to="/contact" onClick={() => setActiveTab("contact")}>Contact</NavLink></li>


            <li><div><b><label className={styles.userDetails}>{loggedinUserDetails?.firstname} {loggedinUserDetails?.lastname}</label></b></div>
              <div><label className={styles.userDetails}>{loggedinUserDetails?.userrole}</label></div></li>
            <NavLink className={styles.logoutButton} to="/logout" onClick={logoutHandler}>Logout</NavLink>
          </ul>
        </div>
        }
      </div>
    </nav>
  )
}