import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import React, { useEffect, useRef, useState, useContext, useNavigate } from "react";
import Axios from "axios";

import Header from './components/common/Header'
import Footer from './components/common/Footer'

// import './App.css';
import styles from './App.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Login from './components/pages/Login'

import CreateProject from './components/projects/CreateProject.js'
import AllProjects from "./components/projects/AllProjects.js";
import ViewProject from './components/projects/ViewProject'

import CreateUser from './components/users/CreateUser'
import AllUsers from './components/users/AllUsers.js'
import ViewUser from './components/users/ViewUser'

import { AppContext } from "./AppContext";

function App() {

  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);

  Axios.defaults.withCredentials = true;
  function parseJson(jsonString){
    if (jsonString){
      return JSON.parse(jsonString)
    }
    return undefined
  }

  useEffect(() => {
      Axios.get(baseurl + '/login').then((response) => {
        if (response.status == 200) {
          response.data.user.userrole = parseJson(response.data.user.userrole).label
          setActiveTab("projects")
          setLoginStatus(true)
          setLoggedinUserDetails(response.data.user)
        }
      })
      .catch((error)=>{
        console.log("please login")
      }
      )
    
  }, []);
  return (
    <div className={styles.App}>
      <Router>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.main}>
          {!loginStatus && <Routes>
            {/* <Route path="/" element={<Navigate to="/login" />}></Route> */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          }
          {loginStatus && <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/project/:mode" element={<CreateProject />} />
            <Route path="/project/view/:id" element={<ViewProject />} />
            <Route path="/project/:mode/:id" element={<CreateProject />} />
            {loggedinUserDetails.userrole=="Admin" && <Route path="/users" element={<AllUsers />} />}
            {loggedinUserDetails.userrole=="Admin" && <Route path="/user/:mode" element={<CreateUser />} />}
            {loggedinUserDetails.userrole=="Admin" && <Route path="/user/view/:id" element={<ViewUser />} />}
            {loggedinUserDetails.userrole=="Admin" && <Route path="/user/:mode/:id" element={<CreateUser />} />}
            <Route path="*" element={<Navigate to="/projects" />} />
          </Routes>
          }
        </div>
        <div className={activeTab === "login" ? styles.footer : styles.footerD9}>
          <Footer />
        </div>
      </Router>
      {/* Toast container */}
      <ToastContainer />
    </div>

  );
}

export default App;

