import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import ProjectHeader from "../components/ProjectHeader";
import ProjectList from "../components/ProjectList";
import AddProjects from "../components/AddProjects";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [isAddProjectsModalOpen, setIsAddProjectsModalOpen] = useState(false);

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

  const toggleAddProjectsModal = () => {
    setIsAddProjectsModalOpen(!isAddProjectsModalOpen);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div className="conatainer">
      <h1>{`Hi, ${name}`}</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/user-projects">User Projects</Link> {/* New Link */}
      </div>
      <h2>
        <ProjectHeader />
      </h2>
      <div>
        <button onClick={toggleAddProjectsModal} className="btn btn-primary">
          Add Projects
        </button>
      </div>
      <ProjectList />
      <button onClick={logOut} className="btn btn-danger">
        Logout
      </button>
      <Modal
        isOpen={isAddProjectsModalOpen}
        onRequestClose={toggleAddProjectsModal}
        contentLabel="Add Projects Modal"
        ariaHideApp={false}
      >
        <AddProjects closeModal={toggleAddProjectsModal} />
      </Modal>
    </div>
  );
};

export default Dashboard;
