import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './CreateProject.css';
import axios from 'axios'
import Select from 'react-select';
import { AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import styles from '../common/TableForm.module.css'
import { AppContext } from "../../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const businessUnits = [
  { value: 'r&d', label: 'R & D' },
  { value: 'lifesciences', label: 'Life Sciences' },
  { value: 'supplyChain', label: 'Supply Chain' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
  { value: 'pharma', label: 'Pharma' },
  { value: 'hr', label: 'HR' },
];;
const statuses = [
  { value: 'inProgress', label: 'In Progress' },
  { value: 'yettoStart', label: 'Yet to Start' },
  { value: 'completed', label: 'Completed' },
  { value: 'abandoned', label: 'Abandoned' },
];
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
];


const CreateProject = () => {

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
    status: 'inProgress',
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required';
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    if (validateForm()) {
      if (mode == "new") {
      console.log(formData);
      
      axios.post(baseurl + "/project", formData).then((response) => {
        if (response.status == 200) {
          toast.success('Form submitted successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, // Close the toast after 3 seconds
          });
          navigate('/projects')
        } else {
          toast.error('Internal server error!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, // Close the toast after 3 seconds
          });
        }
      });
    }else{
      axios.put(baseurl + `/projects/${id}`, formData).then((response) => {
        if (response.status == 200) {
          toast.success('Form submitted successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, // Close the toast after 3 seconds
          });
          navigate('/projects')
        } else {
          toast.error('Internal server error!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, // Close the toast after 3 seconds
          });
        }
      });
    }
    } else {
      toast.error('Please fill all the fields!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Close the toast after 3 seconds
      });
    }
  };

  let navigate = useNavigate()
  let { id, mode } = useParams();
  
  useEffect(() => {
    if (mode == "edit") {
      axios.get(baseurl + `/projects/${id}`).then((response) => {
        response.data.startdate = response.data.startdate.split('T')[0]   
        response.data.enddate = response.data.enddate.split('T')[0]   
        setFormData(response.data);
        console.log(response.data);
      });
    }
  }, []);

  return (
    <>
      <div className={styles.breadcumbs}>
        <AiOutlineMenu className={styles.aiIcon} /><label className={styles.pointerLabel} onClick={() => { navigate(`/projects`) }}>Projects</label><AiOutlineRight className={styles.aiIcon} /><label>{mode=="new"?"Add Project":"Edit Project "+id}</label>
      </div>
      <form className={styles.mainContainer} onSubmit={handleSubmit}>
        {/* <div className={styles.EmpsInner}>
          <label className={styles.title}>About Us</label>
        </div> */}
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
              <option value="">Select Unit</option>
              {businessUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
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
              className={`form-select ${formErrors.technologies ? 'has-error' : ''}`}
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
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-col">
            {/* End Date */}
            <label className="form-label">End Date</label>
            <input
              type="date"
              name="enddate"
              value={formData.enddate}
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
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

          </div>
        </div>
        
        <button type="submit" className={styles.buttonCancel} onClick={(e)=>{e.preventDefault();navigate('/projects')}}>
          Cancel
        </button>
                {"  "}
        <button type="submit" className={styles.buttonLogin}>
        {mode=="new"?"Submit":"Update"}
        </button>
      </form>
    </>
  );
};

export default CreateProject;
