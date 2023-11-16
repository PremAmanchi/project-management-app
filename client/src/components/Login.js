// Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  // const handleRegisterClick = () => {
  //   // Handle the registration logic, e.g., redirect to the registration page
  //   console.log("Navigate to registration page");
  // };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </p>
    </div>
  );
};

export default Login;
