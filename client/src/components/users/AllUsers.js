import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import Popup from '../common/Popup';
import { AiOutlineMenu, AiOutlineRight, AiFillDelete, AiFillEye, AiFillEdit } from "react-icons/ai";
import { AppContext } from "../../AppContext";
import styles from '../common/TableForm.module.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Users() {
  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);
  const [listOfEmployees, setListOfEmployees] = useState([]);
  let navigate = useNavigate()
  useEffect(() => {
    axios.get(baseurl + '/users').then((response) => {
      setListOfEmployees(response.data);
    })
  }, []);
  const currentDate = new Date()
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);


  const handleYesClick = () => {
    // Logic to handle "Yes" click
    axios.delete(baseurl + `/users/${selectedUser}`).then((response) => {
      if (response.status == 200) {
        toast.success('Deleted submitted successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Close the toast after 3 seconds
        });
        axios.get(baseurl + '/users').then((response) => {
          setListOfEmployees(response.data);
        })
      } else {
        toast.error('Internal server error!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Close the toast after 3 seconds
        });
      }
    });
    console.log('User clicked Yes!');

    setShowPopup(false);
  };

  const handleNoClick = () => {
    // Logic to handle "No" click
    console.log('User clicked No!');
    setShowPopup(false);
  };
  return (

    <>
      <div className={styles.breadcumbs}>
        <AiOutlineMenu className={styles.aiIcon} /><label className={styles.pointerLabel} onClick={() => { navigate(`/users`)}}>Users</label>
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
                    <td>{JSON.parse(value.userrole).label}</td>
                    <td>{Math.round((currentDate - new Date(value.joiningdate)) / (60 * 60 * 24 * 365 * 1000) * 100, 2) / 100 + " years"}</td>
                    <td>{value.phonenumber.replace('|', ' ')}</td>
                    <td>
                      <AiFillEye className={`${styles.aiIcon} ${styles.colorBlue}`} onClick={() => {
                        navigate(`/user/view/${value.empid}`);
                      }} size={20} />{" "}
                      <AiFillEdit className={`${styles.aiIcon} ${styles.colorBlue}`} onClick={() => {
                        navigate(`/user/edit/${value.empid}`);
                      }} size={20} />{" "}
                      <AiFillDelete className={`${styles.aiIcon} ${styles.colorRed}`} size={20} onClick={() => { setShowPopup(true); setSelectedUser(value.empid); }} />
                    </td>

                  </tr>
                </tbody>
              </React.Fragment>
            })}
            </>
          </table>
        </div>
      </div>
      {showPopup && (
        <Popup
          message={`Are you sure you want to delete to user ${selectedUser} ?`}
          onYesClick={handleYesClick}
          onNoClick={handleNoClick}
        />
      )}
    </>
  )
}

