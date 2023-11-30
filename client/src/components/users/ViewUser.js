import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select';
import { AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import { AppContext } from "../../AppContext";
import styles from '../common/TableForm.module.css'

const ViewUser = () => {
  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);


  let navigate = useNavigate()
  let { id } = useParams();
  const [employeeObject, setEmployeeObject] = useState({});

  useEffect(() => {
    axios.get(baseurl + `/users/${id}`).then((response) => {
      setEmployeeObject(response.data);
      console.log(response.data);
    });
  }, []);
  function parseJson(jsonString){
    if (jsonString){
      return JSON.parse(jsonString)
    }
    return undefined
  }

  return (
    <>
      <div className={styles.breadcumbs}>
        <AiOutlineMenu className={styles.aiIcon} /><label className={styles.pointerLabel} onClick={() => { navigate(`/users`) }}>Users</label><AiOutlineRight className={styles.aiIcon} /><label>User {id}</label>
      </div>
      <div className={styles.mainContainer} >
        <div className="form-row">
          <div className="form-col">
            {/* First Name */}
            <label className="form-label">First Name</label>
            <label className="form-data">{ employeeObject.firstname}</label>
          </div>
          <div className="form-col">
            {/* Last Name */}
            <label className="form-label">Last Name</label>
            <label className="form-data">{ employeeObject.lastname}</label>
          </div>
          <div className="form-col">
            {/* Email */}
            <label className="form-label">Email</label>
            <label className="form-data">{ employeeObject.email}</label>
          </div>
          <div className="form-col">
            {/* Phone Number */}
            <label className="form-label">Phone Number</label>
            <label className="form-data">{ employeeObject.phonenumber}</label>
          </div>
        </div>

        <div className="form-row">

          <div className="form-col">
            {/* Overview */}
            <label className="form-label">Overview</label>
            <label className="form-data">{ employeeObject.overview}</label>
          </div>
          <div className="form-col">
            {/* Address */}
            <label className="form-label">Address</label>
            <label className="form-data">{ employeeObject.address}</label>
          </div>

        </div>

        <div className='form-row'>

          <div className="form-col">
            {/* Technologies */}
            <label className="form-label">Technologies</label>
            <label className="form-data">{ employeeObject.technologies?.toString().replace(",",", ")}</label>
          </div>


          <div className="form-col">
            {/* Country */}
            <label className="form-label">Country</label>
            <label className="form-data">{ parseJson(employeeObject.country)?.label}</label>
          </div>
        </div>

        <div className="form-row">

          <div className="form-col">
            {/* User Role */}
            <label className="form-label">User Role</label>
            <label className="form-data">{ parseJson(employeeObject.userrole)?.label}</label>
          </div>

          <div className="form-col">
            {/* Joining Date */}
            <label className="form-label">Joining Date</label>
            <label className="form-data">{ employeeObject.joiningdate?.split('T')[0]}</label>
          </div>
        </div>


      </div>
    </>
  );
};

export default ViewUser;
