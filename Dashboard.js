import React, { useState, useEffect } from "react";

import ProjectHeader from "../components/ProjectHeader";
import ProjectList from "../components/ProjectList";
import AddProjects from "../components/AddProjects";

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
      <h1>{`Hi, ${name}`}</h1>
      <h2>
        <ProjectHeader />
      </h2>
      <div>
        <AddProjects />
      </div>
      <ProjectList />
      <button onClick={logOut} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
