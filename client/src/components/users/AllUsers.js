import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'

import IconEdit from "../../images/Edit.png"
import IconView from "../../images/Eye.png"
import { AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import { AppContext } from "../../AppContext";
import styles from '../common/TableForm.module.css'

export default function Users() {
  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);
  const [listOfEmployees, setListOfEmployees] = useState([]);
  let navigate = useNavigate()
  const currentDate = new Date()
  
  useEffect(() => {
    axios.get(baseurl + '/users').then((response) => {
      setListOfEmployees(response.data);
    })
  }, []);
  return (

    <>
      <div className={styles.breadcumbs}>
        <AiOutlineMenu className={styles.aiIcon} /><label>Users</label>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.EmpsInner1}>
          <h3>User Details</h3>
          <button className={styles.buttonNewEmp}
            onClick={() => { navigate(`/user/new`) }}>
            + Add User
          </button>
        </div>
        <div className={styles.EmpsInner2}>
          <table className={styles.EmpsIn}>
            <thead className={styles.borderBottom}>
              <tr className={styles.borderBottomHead}>
                <th>Emplyee ID</th>
                <th>Name</th>
                <th>Overview</th>
                <th>Role</th>
                <th>Experience</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>

            <>{listOfEmployees.map((value, key) => {
              return <React.Fragment key={value.empid}>
                <tbody className={styles.borderBottom}>
                  <tr key={value.empid} className={styles.borderBottom}>
                    <td>{value.empid}</td>
                    <td>{value.firstname + " " + value.lastname}</td>
                    <td>{value.overview}</td>
                    <td>{value.userrole}</td>
                    <td>{Math.round((currentDate - new Date(value.joiningdate)) / (60 * 60 * 24 * 365 * 1000) * 100, 2) / 100 + " years"}</td>
                    <td>{value.phonenumber.replace('|', ' ')}</td>
                    <td>
                      <img src={IconView} className='icon-view' alt='view' onClick={() => {
                        navigate(`/user/${value.empid}`);
                      }} />
                      <label>        </label>
                      <img src={IconEdit} className='icon-edit' alt='edit' onClick={() => {
                        navigate(`/user/edit/${value.empid}`);
                      }} />
                    </td>
                  </tr>
                </tbody>
              </React.Fragment>
            })}
            </>
          </table>
        </div>
      </div>
    </>
  )
}

