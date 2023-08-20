import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
import { ProjectsContext } from "../context/ProjectsContext";

const UpdateTask = () => {
  const { tasks_id } = useParams();
  const { project_id } = useParams();

  useContext(TasksContext);
  useContext(ProjectsContext);

  // const history = useHistory();

  const [input, setInput] = useState({
    task_title: "",
    description: "",
    status: "",
    assigned_to: "",
  });

  const { task_title, description, status, assigned_to } = input;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/projects/${project_id}/tasks/${tasks_id}`,
        {
          method: "GET",
        }
      );
      console.log(response);
      //setInput(response.data);
    };

    fetchData();
  }, [project_id, tasks_id]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const opt = {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       token: localStorage.token,
  //     },
  //     body: JSON.stringify({
  //       task_title,
  //       description,
  //       status,
  //       assigned_to,
  //     }),
  //   };
  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/projects/${project_id}/tasks/${task_id}`,
  //       opt
  //     );
  //     //console.log(res);
  //     setInput(res);
  //     history.push(`/projects/${project_id}`);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="task_title">Task Name</label>
          <input
            value={task_title}
            name="task_title"
            onChange={handleChange}
            id="task_title"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            value={description}
            name="description"
            onChange={handleChange}
            id="description"
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
          <label htmlFor="assigned_to">Assigned to</label>
          <input
            value={assigned_to}
            name="assigned_to"
            onChange={handleChange}
            id="assigned_to"
            className="form-control"
            type="text"
          />
        </div>
        <button
          type="submit"
          //onClick={handleSubmit}
          className="btn btn-primary"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
