
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import Products from "./Products";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    });
  };

  return (
    <div>
      <h1>Hi, {loggedInUser}</h1>
      <Products />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
