// ProjectForm.js
import React, { useState } from "react";

const ProjectForm = ({ onAddProject }) => {
  const [projectName, setProjectName] = useState("");

  const handleInputChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProject(projectName);
    setProjectName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Project Name:
        <input
          type="text"
          value={projectName}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
