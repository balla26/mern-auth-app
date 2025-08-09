import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const newSignupInfo = { ...signupInfo };
    newSignupInfo[name] = value;
    setSignupInfo(newSignupInfo);
    // console.log(newSignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required!");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const responseData = await response.json();
      const { message, success, error } = responseData;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error && error.details && error.details.length > 0) {
        handleError(error.details[0].message);
      } else if (message) {
        handleError(message);
      } else {
        handleError('Signup failed');
      }
      // console.log(responseData);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h3 className="form-title">Signup</h3>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            value={signupInfo.name}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name"
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={signupInfo.email}
            type="email"
            name="email"
            placeholder="Enter your email"
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={signupInfo.password}
            type="password"
            name="password"
            placeholder="Enter your password"
          ></input>
        </div>
        <button type="submit">Signup</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
