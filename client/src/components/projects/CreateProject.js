import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom'
import { AppContext } from "../../AppContext";
import './CreateProject.css'; // Import the CSS file
import Select from 'react-select';

const businessUnits = ['Unit A', 'Unit B', 'Unit C'];
const statuses = ['In Progress', 'Yet to Start', 'Completed', 'Abandoned'];
const technologyOptions = [
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

export default function CreateProject() {
  let navigate = useNavigate()
  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    description: '',
    value: '',
    technologies: [],
    manager: '',
    client: '',
    startdate: '',
    enddate: '',
    status: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTechnologiesChange = (selectedOptions) => {
    const selectedTechnologies = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      technologies: selectedTechnologies,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // You can add additional validation before submitting
    console.log(formData);
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters';
    }
    if (formData.description.length > 300) {
      newErrors.description = 'Description cannot exceed 300 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = () => {
    validateForm();
  };

  return (
    <div className="container">
      <h2>Project Form</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="column">
          <div className="form-group">
            <label htmlFor="name" className="label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-field"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="unit" className="label">
              Unit:
            </label>
            <select id="unit" name="unit" value={formData.unit} onChange={handleChange} className="select-field">
              <option value="">Select Unit</option>
              {businessUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="textarea-field"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
        </div>
        <div className="column">
          <div className="form-group">
            <label htmlFor="value" className="label">
              Value:
            </label>
            <input type="number" id="value" name="value" value={formData.value} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="technologies" className="label">
              Technologies:
            </label>
            <Select
              isMulti
              id="technologies"
              name="technologies"
              options={technologyOptions}
              value={technologyOptions.filter((tech) => formData.technologies.includes(tech.value))}
              onChange={handleTechnologiesChange}
            />
          </div>
        </div>
        <div className="column">
          <div className="form-group">
            <label htmlFor="manager" className="label">
              Manager:
            </label>
            <input type="text" id="manager" name="manager" value={formData.manager} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="client" className="label">
              Client:
            </label>
            <input type="text" id="client" name="client" value={formData.client} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="startdate" className="label">
              Start Date:
            </label>
            <input
              type="date"
              id="startdate"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="enddate" className="label">
              End Date:
            </label>
            <input type="date" id="enddate" name="enddate" value={formData.enddate} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="status" className="label">
              Status:
            </label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="select-field">
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};
