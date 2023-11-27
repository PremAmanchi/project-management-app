import React, { useState } from "react";
import AddProjectPage from "./AddProjectPage";

const ProjectsTable = ({ projects, onDeleteProject, onAddProject }) => {
  const [showAddProject, setShowAddProject] = useState(false);

  const onProjectSubmit = (projectData) => {
    onAddProject(projectData);
    setShowAddProject(false);
  };

  return (
    <>
      {showAddProject ? (
        <AddProjectPage addProject={onProjectSubmit} />
      ) : (
        <div>
          <button onClick={() => setShowAddProject(true)}>Add Project</button>
          <h1> Projects Table</h1>

          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Name</th>
                <th>Unit</th>
                <th>Description</th>
                <th>Value</th>
                <th>Technologies</th>
                <th>Manager</th>
                <th>Client</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.projectid}</td>
                  <td>{project.name}</td>
                  <td>{project.unit}</td>
                  <td>{project.description}</td>
                  <td>{project.value}</td>
                  <td>{project.technologies}</td>
                  <td>{project.manager}</td>
                  <td>{project.client}</td>
                  <td>{project.startdate}</td>
                  <td>{project.enddate}</td>
                  <td>{project.status}</td>
                  <td>
                    <button onClick={() => onDeleteProject(project.projectid)}>
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
