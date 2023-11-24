// Dashboard.js
import React, { useState } from "react";
import ProjectsTable from "./ProjectsTable";
import ProjectForm from "./ProjectForm";

const Dashboard = () => {
  const [projects, setProjects] = useState([
    "Project A",
    "Project B",
    "Project C",
  ]);

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <ProjectForm onAddProject={handleAddProject} />
      <ProjectsTable
        projects={projects}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  );
};

export default Dashboard;
