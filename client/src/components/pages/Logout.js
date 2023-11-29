import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom'
import { AppContext } from "../../AppContext";



export default function Logout() {

  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);
  let navigate = useNavigate()
  

  
  Axios.defaults.withCredentials = true;

  const login = () => {
    navigate('/login');
  };


  return (
    <>
      <div className="loginContainer">
        <h1>Logout Sucessfull</h1>
        <button onClick={login} className="buttonLogin"> Login </button>
      </div>
    </>
  );
}
