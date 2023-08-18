import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ProjectsContext } from "../context/ProjectsContext";
import ProjectFinder from "../apis/ProjectFinder";

const UpdateProject = (props) => {
  const { project_id } = useParams();

  const history = useHistory();

  useContext(ProjectsContext);

  const [input, setInput] = useState({
    project_name: "",
    address: "",
    status: "",
    deadline: "",
    milestones: "",
  });

  const { project_name, address, status, deadline, milestones } = input;

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProjectFinder.get(`/${project_id}`, {
        headers: {
          token: localStorage.token,
        },
      });
      //console.log(response.data);
      setInput(response.data);
    };

    fetchData();
  }, [project_id]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const opt = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: localStorage.token,
      },
      body: JSON.stringify({
        project_name,
        address,
        deadline,
        status,
        milestones,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:5000/projects/${project_id}`,
        opt
      );
      console.log(res);
      history.push("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Project Name</label>
          <input
            value={project_name}
            name="project_name"
            onChange={handleChange}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            value={address}
            name="address"
            onChange={handleChange}
            id="address"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            value={status}
            name="status"
            onChange={handleChange}
            id="status"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            value={deadline}
            name="deadline"
            onChange={handleChange}
            id="deadline"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="milestones">Milestones</label>
          <input
            value={milestones}
            name="milestones"
            onChange={handleChange}
            id="milestones"
            className="form-control"
            type="text"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
