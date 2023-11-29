import React ,{useEffect, useState, useContext }from 'react'
import {useParams} from 'react-router-dom'
import axios from "axios";
import { AppContext } from "../../AppContext";
export default function ViewProject() {
    let {id} = useParams();
    const [employeeObject, setEmployeeObject]=useState({});
    const { loggedinUserDetails, setLoggedinUserDetails,
      loginStatus, setLoginStatus,
      activeTab, setActiveTab,
      baseurl } = useContext(AppContext);
    useEffect(()=>{
      axios.get(`http://localhost:5000/api/employee/${id}`).then((response)=>{
      setEmployeeObject(response.data);
      // console.log(response.data);
    });
  },[]);
  
  return (
    <div className="oneEmpViewmain">
    <div className="oneEmpView"><br/>
    <label>Employee Details - Emp ID : {employeeObject.id}</label>
    
    <br/><br/>
        <table className="table">
          <tr>
            <td> Employee ID</td>
            <td> {employeeObject.id}</td>
          </tr>
          <tr>
            <td> Employee Name</td>
            <td> {employeeObject.name}</td>
          </tr>
          <tr>
            <td> Gender</td>
            <td> {employeeObject.gender}</td>
          </tr>
          <tr>
            <td> Date of Birth</td>
            <td> {employeeObject.dateofbirth}</td>
          </tr>
          <tr>
            <td> Address</td>
            <td> {employeeObject.address}</td>
          </tr>
          <tr>
            <td> Salary</td>
            <td> {employeeObject.salary}</td>
          </tr>
          <tr>
            <td> Experience</td>
            <td> {employeeObject.experience}</td>
          </tr>
          <tr>
            <td> Phone Number</td>
            <td> {employeeObject.phonenumber}</td>
          </tr>
          <tr>
            <td> Date Of Joining</td>
            <td> {employeeObject.dateofjoining}</td>
          </tr>
          <tr>
            <td> Role</td>
            <td> {employeeObject.role}</td>
          </tr>
        </table>
    </div>
    </div>
  )
}
