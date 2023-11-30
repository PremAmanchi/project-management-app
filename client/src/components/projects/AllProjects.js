import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import Popup from '../common/Popup';

import IconEdit from "../../images/Edit.png"
import IconView from "../../images/Eye.png"
import { AiOutlineMenu, AiOutlineRight, AiFillDelete, AiFillEye, AiFillEdit } from "react-icons/ai";
import { AppContext } from "../../AppContext";
import styles from '../common/TableForm.module.css'

export default function Projects() {
  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);
  const [listOfEmployees, setListOfEmployees] = useState([]);
  let navigate = useNavigate()
  useEffect(() => {
    axios.get(baseurl + '/projects').then((response) => {
      setListOfEmployees(response.data);
    })
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleYesClick = () => {
    // Logic to handle "Yes" click
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
        <AiOutlineMenu className={styles.aiIcon} /><label>Projects</label><AiOutlineRight className={styles.aiIcon} /><label>All Projects</label>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.EmpsInner1}>
          <h3>Project Details</h3>
          <button className={styles.buttonNewEmp}
            onClick={() => { navigate(`/project/new`) }}>
            + Add Project
          </button>
        </div>
        <div className={styles.EmpsInner2}>
          <table className={styles.EmpsIn}>
            <thead className={styles.borderBottom}>
              <tr className={styles.borderBottomHead}>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Unit</th>
                <th>Description</th>
                <th>Technologies</th>
                <th>Project manager</th>
                <th>Actions</th>
              </tr>
            </thead>

            <>{listOfEmployees.map((value, key) => {
              return <React.Fragment key={value.projectid}>
                <tbody className={styles.borderBottom}>
                  <tr key={value.projectid} className={styles.borderBottom}>
                    <td>{value.projectid}</td>
                    <td>{value.name}</td>
                    <td>{value.unit}</td>
                    <td>{value.description}</td>
                    <td>{value.technologies.toString().replaceAll(",", ", ")}</td>
                    <td>{value.manager}</td>
                    <td>
                      <AiFillEye className={`${styles.aiIcon} ${styles.colorBlue}`} onClick={() => {
                        navigate(`/project/view/${value.projectid}`);
                      }} size={20}/>{ " "}
                      <AiFillEdit className={`${styles.aiIcon} ${styles.colorBlue}`} onClick={() => {
                        navigate(`/project/edit/${value.projectid}`);
                      }} size={20}/>{ " "}
                      <AiFillDelete className={`${styles.aiIcon} ${styles.colorRed}`} size={20} onClick={() => setShowPopup(true)}/>
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
          message="Do you want to proceed?"
          onYesClick={handleYesClick}
          onNoClick={handleNoClick}
        />
      )}
    </>
  )
}

