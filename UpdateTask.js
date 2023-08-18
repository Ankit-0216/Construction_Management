import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
//import ProjectFinder from "../apis/ProjectFinder";
import TaskFinder from "../apis/TaskFinder";

const UpdateProject = ({ closeModal }) => {
  const { project_id } = useParams();

  const { task_id } = useParams();

  //   const history = useHistory();

  const { setIsUpdateButtonClicked } = useContext(TasksContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdateButtonClicked((prev) => ++prev);
    closeModal();
  };

  const [input, setInput] = useState({
    task_title: "",
    description: "",
    status: "",
    type_of_task: "",
    assigned_to: "",
  });

  const { task_title, description, status, type_of_task, assigned_to } = input;

  useEffect(() => {
    const fetchData = async () => {
      const response = await TaskFinder.get(`/${project_id}/tasks/${task_id}`);
      console.log(response.data);
      setInput(response.data);
    };

    fetchData();
  }, [project_id, task_id]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const opt = {
  //       method: "PUT",
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         token: localStorage.token,
  //       },
  //       body: JSON.stringify({
  //         project_name,
  //         address,
  //         deadline,
  //         status,
  //         milestones,
  //       }),
  //     };
  //     try {
  //       const res = await fetch(
  //         `http://localhost:5000/projects/${project_id}`,
  //         opt
  //       );
  //       console.log(res);
  //       history.push("/dashboard");
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

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
          <label htmlFor="type_of_task">Type of Task</label>
          <input
            value={type_of_task}
            name="type_of_task"
            onChange={handleChange}
            id="type_of_task"
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
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
