import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './CreateUser.css';
import axios from 'axios'
import Select from 'react-select';
import { AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import styles from '../common/TableForm.module.css'
import { AppContext } from "../../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const CreateUser = () => {

  const { loggedinUserDetails, setLoggedinUserDetails,
    loginStatus, setLoginStatus,
    activeTab, setActiveTab,
    baseurl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    overview: '',
    email: '',
    phonenumber: '',
    address: '',
    country: null,
    userrole: null,
    technologies: [],
    joiningdate: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const countriesOptions = [
    { value: 'usa', label: 'USA' },
    { value: 'canada', label: 'Canada' },
    { value: 'india', label: 'India' },
    { value: 'australia', label: 'Australia' },
    { value: 'japan', label: 'Japan' },
    { value: 'china', label: 'China' },
  ];

  const userRolesOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'projectManager', label: 'Project Manager' },

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

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required';
      }else if(formData['technologies'].length ==0){
        errors['technologies'] = 'This field is required';
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

  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption,
    });
  };

  const handleUserRoleChange = (selectedOption) => {
    setFormData({
      ...formData,
      userrole: selectedOption,
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

        axios.post(baseurl + "/user", formData).then((response) => {
          if (response.status == 200) {
            toast.success('Form submitted successfully!', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000, // Close the toast after 3 seconds
            });
            toast.success(`Please share the default password with user! ${response.data.defaultpassword}`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 15000, // Close the toast after 3 seconds
            });
            navigate('/users')
          } else {
            toast.error('Internal server error!', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000, // Close the toast after 3 seconds
            });
          }
        });
      } else {
        axios.put(baseurl + `/users/${id}`, formData).then((response) => {
          if (response.status == 200) {
            toast.success('Form submitted successfully!', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000, // Close the toast after 3 seconds
            });
            navigate('/users')
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
  function parseJson(jsonString){
    if (jsonString){
      return JSON.parse(jsonString)
    }
    return undefined
  }

  useEffect(() => {
    if (mode == "edit") {
      axios.get(baseurl + `/users/${id}`).then((response) => {
        response.data.joiningdate = response.data.joiningdate.split('T')[0]
        response.data.country = parseJson(response.data.country) 
        response.data.userrole = parseJson(response.data.userrole) 
        setFormData(response.data);
        console.log(response.data);
      });
    }
  }, []);

  return (
    <>
      <div className={styles.breadcumbs}>
        <AiOutlineMenu className={styles.aiIcon} /><label className={styles.pointerLabel} onClick={() => { navigate(`/users`) }}>Users</label><AiOutlineRight className={styles.aiIcon} /><label>{mode=="new"?"Add User":"Edit User "+id}</label>
      </div>
      <form className={styles.mainContainer} onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            {/* First Name */}
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className={`form-input ${formErrors.firstname ? 'has-error' : ''}`}
            />
            {formErrors.firstname && <p className="error-message">{formErrors.firstname}</p>}
          </div>
          <div className="form-col">
            {/* Last Name */}
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={`form-input ${formErrors.lastname ? 'has-error' : ''}`}
            />
            {formErrors.lastname && <p className="error-message">{formErrors.lastname}</p>}
          </div>
          <div className="form-col">
            {/* Email */}
            <label className="form-label">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${formErrors.email ? 'has-error' : ''}`}
            />
            {formErrors.email && <p className="error-message">{formErrors.email}</p>}
          </div>
          <div className="form-col">
            {/* Phone Number */}
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className={`form-input ${formErrors.phonenumber ? 'has-error' : ''}`}
            />
            {formErrors.phonenumber && <p className="error-message">{formErrors.phonenumber}</p>}
          </div>
        </div>

        <div className="form-row">

          <div className="form-col">
            {/* Overview */}
            <label className="form-label">Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              maxLength={300}
              className={`form-textarea1 ${formErrors.overview ? 'has-error' : ''}`}
            />
            {formErrors.overview && <p className="error-message">{formErrors.overview}</p>}
          </div>
          <div className="form-col">
            {/* Address */}
            <label className="form-label">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              maxLength={300}
              className={`form-textarea1 ${formErrors.address ? 'has-error' : ''}`}
            />
            {formErrors.address && <p className="error-message">{formErrors.address}</p>}
          </div>

        </div>

        <div className='form-row'>

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
            {formErrors.technologies && <p className="error-message">{formErrors.technologies}</p>}
          </div>


          <div className="form-col">
            {/* Country */}
            <label className="form-label">Country</label>
            <Select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              options={countriesOptions}
              className={`form-select ${formErrors.country ? 'has-error' : ''}`}
            />
            {formErrors.country && <p className="error-message">{formErrors.country}</p>}
          </div>
        </div>

        <div className="form-row">

          <div className="form-col">
            {/* User Role */}
            <label className="form-label">User Role</label>
            <Select
              name="userrole"
              value={formData.userrole}
              onChange={handleUserRoleChange}
              options={userRolesOptions}
              className={`form-select ${formErrors.userrole ? 'has-error' : ''}`}
            />
            {formErrors.userrole && <p className="error-message">{formErrors.userrole}</p>}
          </div>

          <div className="form-col">
            {/* Joining Date */}
            <label className="form-label">Joining Date</label>
            <input
              type="date"
              name="joiningdate"
              value={formData.joiningdate}
              onChange={handleChange}
              className={`form-input1 ${formErrors.joiningdate ? 'has-error' : ''}`}
            />
            {formErrors.joiningdate && <p className="error-message">{formErrors.joiningdate}</p>}
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

export default CreateUser;
