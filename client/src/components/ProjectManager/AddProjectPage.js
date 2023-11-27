import React, { useState } from "react";

const AddProjectPage = ({ addProject }) => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [manager, setManager] = useState("");
  const [client, setClient] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();

    addProject({
      name,
      unit,
      description,
      value,
      technologies,
      manager,
      client,
      startdate,
      enddate,
      status,
    });
  };

  return (
    <form onSubmit={handleAddProjectSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Unit:</label>
        <input
          type="text"
          name="unit"
          className="form-control"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Value:</label>
        <input
          type="text"
          name="value"
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Technologies:</label>
        <input
          type="text"
          name="technologies"
          className="form-control"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Manager:</label>
        <input
          type="text"
          name="manager"
          className="form-control"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Client:</label>
        <input
          type="text"
          name="client"
          className="form-control"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Start Date:</label>
        <input
          type="text"
          name="startdate"
          className="form-control"
          value={startdate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>End Date:</label>
        <input
          type="text"
          name="enddate"
          className="form-control"
          value={enddate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <input
          type="text"
          name="status"
          className="form-control"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Project
      </button>
    </form>
  );
};

export default AddProjectPage;
