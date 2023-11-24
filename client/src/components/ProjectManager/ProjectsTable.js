// ProjectsTable.js
import React from "react";

const ProjectsTable = ({ projects, onDeleteProject }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index}>
            <td>{project}</td>
            <td>
              <button onClick={() => onDeleteProject(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectsTable;
