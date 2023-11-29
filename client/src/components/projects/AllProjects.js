import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'

import IconEdit from "../../images/Edit.png"
import IconView from "../../images/Eye.png"
import { AppContext } from "../../AppContext";

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
  return (


    <>
      <div className="maincontai">
        <div className="EmpsInnerCointain">
          <div className="EmpsInner">
            <h3>Project Details</h3>
            <button className="buttonNewEmp"
              onClick={() => { navigate(`/project/new`) }}>
              + Add Project
            </button>
          </div>
          <div >
            <table className="EmpsIn">
              <thead className="border-bottom">
                <tr className="border-bottom-head">
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
                return <React.Fragment key={value.id}>
                  <tbody className="border-bottom">
                    <tr key={value.projectid} className="border-bottom">
                      <td>{value.projectid}</td>
                      <td>{value.name}</td>
                      <td>{value.unit}</td>
                      <td>{value.description}</td>
                      <td>{value.technologies}</td>
                      <td>{value.manager}</td>
                      <td>
                        <img src={IconView} className='icon-view' alt='view' onClick={() => {
                          navigate(`/employee/${value.id}`);
                        }} />
                        <label>        </label>
                        <img src={IconEdit} className='icon-edit' alt='edit' onClick={() => {
                          navigate(`/employee/edit/${value.id}`);
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
      </div>
    </>
  )
}

