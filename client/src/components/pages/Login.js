import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { AppContext } from "../../AppContext";


export default function Login() {

  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);



  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatusMessage, setLoginStatusMessage] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate()

  const loginHandler = () => {
    if (!username) {
      setLoginStatusMessage('Username cannot be empty')
    }
    else if (!password) {
      setLoginStatusMessage('Password cannot be empty')
    }
    else {
      Axios.post(baseurl+"/login", {
        empid: username,
        password: password,
      }).then((response) => {
        if (response.status == 200) {
          setActiveTab("projects")
          setLoginStatus(true)
          setLoggedinUserDetails(response.data.user)
          setLoginStatusMessage(response.data.message);
          navigate('/projects')
        } else {
          setLoginStatusMessage(response.data.message);
        }
      });
    }
  };


  return (
    <>
      <div className="loginContainer">
        <h1 className="title">Login</h1>
        <br />
        <label className="inputLabel">Employee ID</label>
        <input className="inputTextbox"
          value={username}
          type="number"
          placeholder="21"
          onChange={(e) => {
            const limit = 6;
            setUsername(e.target.value.slice(0, limit));
          }}

        />
        <br />
        <label className="inputLabel">Password</label>
        <div className="wrapper">
          <input className="inputTextbox"
            type={passwordType}
            placeholder="Enter Password"
            maxLength={20}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="icon" onClick={togglePassword}>{passwordType === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}</div>
        </div>
        <label className="labelForgotPassword">Forgot Password? Contact admin</label>
        <button className="buttonLogin" onClick={loginHandler}> Login </button>
        <label className="labelLoginErrorMessage">{loginStatusMessage}</label>
        <label className="labelLoginErrorMessage">{loggedinUserDetails?.firstname}</label>
      </div>
    </>
  );
}
