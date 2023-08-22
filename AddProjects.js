import React, { useContext, useState } from "react";
//import ProjectFinder from "../apis/ProjectFinder";
import { ProjectsContext } from "../context/ProjectsContext";

const AddProjects = ({ closeModal }) => {
  const { addProjects, setIsAddButtonClicked } = useContext(ProjectsContext);
  const [input, setInput] = useState({
    project_name: "",
    address: "",
    deadline: "",
    status: "",
  });

  const { project_name, address, deadline, status } = input;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: localStorage.token,
      },
      body: JSON.stringify({
        project_name,
        address,
        deadline,
        status,
        milestones: "milestones",
      }),
    };

    try {
      const res = await fetch("http://localhost:5000/projects", opt);
      //console.log(res);
      addProjects(res);
      setIsAddButtonClicked((prev) => ++prev);
    } catch (error) {
      console.error(error.message);
    }
    closeModal();
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={project_name}
              name="project_name"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Project Name"
            />
          </div>
          <div className="col">
            <input
              value={address}
              name="address"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="address"
            />
          </div>
          <div className="col">
            <input
              value={deadline}
              name="deadline"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="deadline"
            />
          </div>
          <div className="col">
            <input
              value={status}
              name="status"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="status"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            ADD PROJECT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjects;
