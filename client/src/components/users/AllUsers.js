import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import moment from "moment";

import IconEdit from "../../images/Edit.png"
import IconView from "../../images/Eye.png"
import { AppContext } from "../../AppContext";

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
      <div className="maincontai">
        <div className="EmpsInnerCointain">
          <div className="EmpsInner">
            <h3>Employee Details</h3>
            <button className="buttonNewEmp"
              onClick={() => { navigate(`/employee/new`) }}>
              + Add Employee
            </button>
          </div>
          <div >
            <table className="EmpsIn">
              <thead className="border-bottom">
                <tr className="border-bottom-head">
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
                return <React.Fragment key={value.id}>
                  <tbody className="border-bottom">
                    <tr key={value.empid} className="border-bottom">
                      <td>{value.empid}</td>
                      <td>{value.firstname +" "+ value.lastname}</td>
                      <td>{value.overview}</td>
                      <td>{value.userrole}</td>
                      <td>{Math.round((currentDate - new Date(value.joiningdate))/(60*60*24*365*1000)*100,2)/100 + " years"}</td>
                      <td>{value.phonenumber.replace('|', ' ')}</td>
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
