// ProjectsTable.js
import React, {useState} from "react";
import AddUserPage from "./AddUserPage";

const ProjectsTable = ({ projects, onDeleteProject, onAddUser }) => {
  const [showUser, setShowUser] = useState(false);
  const onUserSubmit = (userData) => {
    onAddUser(userData);
    setShowUser(false);
  }
  return (
    <>
      {showUser ? (
        <AddUserPage addUser={onUserSubmit} />
      ) : (
        <div>
          <button onClick={() => setShowUser(true)}>Add User</button>
          <table>
            <thead>
              <tr>
                <th>EMPID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Overview</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Country</th>
                <th>User Role</th>
                <th>Technologies</th>
                <th>Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.empid}</td>
                  <td>{project.firstname}</td>
                  <td>{project.lastname}</td>
                  <td>{project.overview}</td>
                  <td>{project.email}</td>
                  <td>{project.phonenumber}</td>
                  <td>{project.address}</td>
                  <td>{project.country}</td>
                  <td>{project.userrole}</td>
                  <td>{project.technologies}</td>
                  <td>{project.joiningdate}</td>
                  <td>
                    <button onClick={() => onDeleteProject(project.empid)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProjectsTable;
