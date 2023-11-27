// ProjectsTable.js
import React, { useState } from "react";
import AddUserPage from "./AddUserPage";

const AdminTable = ({ users, onDeleteUser, onAddUser }) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const onUserSubmit = (userData) => {
    onAddUser(userData);
    setShowAddUser(false);
  };
  return (
    <>
      {showAddUser ? (
        <AddUserPage addUser={onUserSubmit} />
      ) : (
        <div>
          <button onClick={() => setShowAddUser(true)}>Add User</button>
          <h1> Admin Table</h1>
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
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.empid}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.overview}</td>
                  <td>{user.email}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.address}</td>
                  <td>{user.country}</td>
                  <td>{user.userrole}</td>
                  <td>{user.technologies}</td>
                  <td>{user.joiningdate}</td>
                  <td>
                    <button onClick={() => onDeleteUser(user.empid)}>
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

export default AdminTable;
