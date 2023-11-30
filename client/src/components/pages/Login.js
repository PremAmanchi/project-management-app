import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { AppContext } from "../../AppContext";
import styles from './Login.module.css'


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
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Login</h1>
        <br />
        <label className={styles.inputLabel}>Employee ID</label>
        <input className={styles.inputTextbox}
          value={username}
          type="number"
          placeholder="21"
          onChange={(e) => {
            const limit = 6;
            setUsername(e.target.value.slice(0, limit));
          }}

        />
        <br />
        <label className={styles.inputLabel}>Password</label>
        <div className={styles.wrapper}>
          <input className={styles.inputTextbox}
            type={passwordType}
            placeholder="Enter Password"
            maxLength={20}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className={styles.icon} onClick={togglePassword}>{passwordType === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}</div>
        </div>
        <label className={styles.labelForgotPassword}>Forgot Password? Contact admin</label>
        <button className={styles.buttonLogin} onClick={loginHandler}> Login </button>
        <label className={styles.labelLoginErrorMessage}>{loginStatusMessage}</label>
      </div>
    </>
  );
}
