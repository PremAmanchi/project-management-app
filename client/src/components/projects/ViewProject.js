import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select';
import { AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import { AppContext } from "../../AppContext";
import styles from '../common/TableForm.module.css'

const ViewProject = () => {
  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);


  let navigate = useNavigate()
  let { id } = useParams();
  const [employeeObject, setEmployeeObject] = useState({});

  useEffect(() => {
    axios.get(baseurl + `/projects/${id}`).then((response) => {
      setEmployeeObject(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <div className={styles.breadcumbs}>
        <AiOutlineMenu className={styles.aiIcon} /><label className={styles.pointerLabel} onClick={() => { navigate(`/projects`) }}>Projects</label><AiOutlineRight className={styles.aiIcon} /><label>Project {id}</label>
      </div>
      <div className={styles.mainContainer} >
        <div className="form-row">
          <div className="form-col">

            <label className="form-label">Name</label>
            <label className="form-data">{ employeeObject.name}</label>

          </div>
          <div className="form-col">
            {/* Unit */}
            <label className="form-label">Unit</label>
            <label className="form-data">{ employeeObject.unit}</label>
          </div>
          <div className="form-col">
            {/* Value */}
            <label className="form-label">Value</label>
            <label className="form-data">{ employeeObject.value}</label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            {/* Description */}
            <label className="form-label">Description</label>
            <label className="form-data">{ employeeObject.description}</label>
          </div>
        </div>

        <div className="form-row">

          <div className="form-col">
            {/* Technologies */}
            <label className="form-label">Technologies</label>
            <label className="form-data">{ employeeObject.technologies?.toString()?.replace(",",", ")}</label>
          </div>
          <div className="form-col">
            {/* Manager */}
            <label className="form-label">Manager</label>
            <label className="form-data">{ employeeObject.manager}</label>
          </div>
          <div className="form-col">
            {/* Client */}
            <label className="form-label">Client</label>
            <label className="form-data">{ employeeObject.client}</label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            {/* Start Date */}
            <label className="form-label">Start Date</label>
            <label className="form-data">{ employeeObject.startdate?.split("T")[0]}</label>
          </div>
          <div className="form-col">
            {/* End Date */}
            <label className="form-label">End Date</label>
            <label className="form-data">{ employeeObject.enddate?.split("T")[0]}</label>
          </div>
          <div className="form-col">
            {/* Status */}
            <label className="form-label">Status</label>
            <label className="form-data">{ employeeObject.status}</label>

          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
