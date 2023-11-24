// Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navber from "./Navber/Navber";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("YOUR_LOGIN_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Handle successful login, e.g., redirect or set user state
      console.log("Login successful");
    } catch (error) {
      // Handle login error, e.g., show an error message
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Navber />
          <br></br>
          <br></br>
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <p className="mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="btn btn-secondary">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
