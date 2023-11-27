import React, { useState } from "react";

const AddUserPage = ({ addUser }) => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [overview, setOverview] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [userrole, setUserRole] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [joiningdate, setJoiningDate] = useState("");


    const handleAddUserSubmit = (e) => {
      e.preventDefault();

    addUser({
      firstname,
      lastname,
      overview,
      email,
      phonenumber,
      address,
      country,
      userrole,
      technologies,
      joiningdate,
    });
  };
  return (
    <form onSubmit={handleAddUserSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          className="form-control"
          value={firstname}
          onChange={(e)=> setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          className="form-control"
          value={lastname}
          onChange={(e)=> setLastName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Overview:</label>
        <input
          type="text"
          name="overview"
          className="form-control"
          value={overview}
          onChange={(e)=> setOverview(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          value={phonenumber}
          onChange={(e)=> setPhonenumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={address}
          onChange={(e)=> setAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Country:</label>
        <input
          type="text"
          name="country"
          className="form-control"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>User Role:</label>
        <input
          type="text"
          name="userrole"
          className="form-control"
          value={userrole}
          onChange={(e)=> setUserRole(e.target.value)}
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
          onChange={(e)=> setTechnologies(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Joining Date:</label>
        <input
          type="text"
          name="joindate"
          className="form-control"
          value={joiningdate}
          onChange={(e)=> setJoiningDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add User
      </button>
    </form>
  );
};

export default AddUserPage;
