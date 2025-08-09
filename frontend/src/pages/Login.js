import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newLoginInfo = { ...loginInfo };
    newLoginInfo[name] = value;
    setLoginInfo(newLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are required!");
    }
    try {
      const url = "https://mern-auth-app-api-delta.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const responseData = await response.json();
      const { message, success, jwtToken, name, error } = responseData;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error && error.details && error.details.length > 0) {
        handleError(error.details[0].message);
      } else if (message) {
        handleError(message);
      } else {
        handleError('Login failed');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h3 className="form-title">Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={loginInfo.email}
            type="email"
            name="email"
            placeholder="Enter your email"
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={loginInfo.password}
            type="password"
            name="password"
            placeholder="Enter your password"
          ></input>
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
