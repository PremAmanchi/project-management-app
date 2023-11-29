import React, { useState } from 'react';
import './CreateProject1.css'; // Import the CSS file
import Select from 'react-select';

const businessUnits = ['Unit A', 'Unit B', 'Unit C'];
const statuses = ['In Progress', 'Yet to Start', 'Completed', 'Abandoned'];
const technologiesOptions = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'node', label: 'Node.js' },
  { value: 'express', label: 'Express.js' },
  { value: 'mongodb', label: 'MongoDB' },
  // Add more technology options as needed
];


const CreateProject1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    description: '',
    value: '',
    technologies: [],
    manager: '',
    client: '',
    startDate: '',
    endDate: '',
    status: 'inProgress',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTechnologiesChange = (selectedOptions) => {
    const technologies = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      technologies,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // handle form submission logic here
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-col">
          
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={100}
            className="form-input"
          />
        </div>
        <div className="form-col">
          {/* Unit */}
          <label className="form-label">Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="form-select"
          >
            <option value="businessUnit1">Business Unit 1</option>
            <option value="businessUnit2">Business Unit 2</option>
            {/* Add more business units as needed */}
          </select>
        </div>
        <div className="form-col">
          {/* Value */}
          <label className="form-label">Value</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            pattern="[0-9]+"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          {/* Description */}
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={300}
            className="form-textarea"
          />
        </div>
      </div>

      <div className="form-row">
        
        <div className="form-col">
        {/* Technologies */}
        <label className="form-label">Technologies</label>
        <Select
          isMulti
          name="technologies"
          options={technologiesOptions}
          value={technologiesOptions.filter((option) => formData.technologies.includes(option.value))}
          onChange={handleTechnologiesChange}
          className="form-select"
        />
      </div>
        <div className="form-col">
          {/* Manager */}
          <label className="form-label">Manager</label>
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            maxLength={100}
            className="form-input"
          />
        </div>
        <div className="form-col">
          {/* Client */}
          <label className="form-label">Client</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            maxLength={100}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          {/* Start Date */}
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-col">
          {/* End Date */}
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-col">
          {/* Status */}
          <label className="form-label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="inProgress">In Progress</option>
            <option value="yetToStart">Yet to Start</option>
            <option value="completed">Completed</option>
            <option value="abandoned">Abandoned</option>
          </select>
        </div>
      </div>

      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default CreateProject1;
