import React, { useState, useEffect } from "react";

import ProjectHeader from "../components/ProjectHeader";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const data = await res.json();
      if (data.user_name) {
        setName(data.user_name);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div>
      <h1>Dashboard, {`Hi, ${name}`}</h1>
      <ProjectHeader />
      <button onClick={logOut} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
