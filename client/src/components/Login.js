import React, { useState } from "react";
import axios from "axios";
import ProjectsTable from "./ProjectManager/ProjectsTable";

const baseURL = "http://localhost:3001";

const Login = () => {
  const [empid, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [userData, setUserData] = useState([]);
  const [adminTable, SetAdminTable] = useState([]);
  const [projectTable, SetProjectTable] = useState([]);
 

  const handleEmpIdChange = (e) => {
    setEmpId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${baseURL}/users`);
      setUserData(res.data);
      console.log(res);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const deleteUser = async (empId) => {
    try {
      const res = await axios.delete(`${baseURL}/users/${empId}`);
      if (res.status === 200) {
        fetchUserData();
        console.log("User deleted successfully");
      } else {
        console.log("User not deleted");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const addUser = async (newUserData) => {
    try {
      const res = await axios.post(`${baseURL}/user`, newUserData);
      if (res.status === 200) {
        fetchUserData();
        setShowAdmin(true);
        console.log("User added successfully");
      } else {
        console.log("Error adding user");
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/login`, {
        empid,
        password,
      });

      if (response.status === 200) {
        fetchUserData();
        setShowAdmin(true);
        console.log("Login successful");
      } else {
        setShowAdmin(false);
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogout = () => {
    setShowAdmin(false);
  };

  

  return (
    <>
      {showAdmin ? (
        <div>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
          <ProjectsTable
            projects={userData}
            onDeleteProject={deleteUser}
            onAddUser={addUser}
          />
        </div>
      ) : (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <br />
              <br />
              <h2 className="mb-4">Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label>Emp ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={empid}
                    onChange={handleEmpIdChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
