import React, { useContext, useState } from "react";
import { TasksContext } from "../context/TasksContext";
import { useParams } from "react-router-dom";

const AddTasks = ({ closeModal }) => {
  // const { project_id } = useParams();
  // const { addTasks, setIsAddButtonClicked } = useContext(TasksContext);
  const { setIsAddButtonClicked } = useContext(TasksContext);
  const [input, setInput] = useState({
    task_title: "",
    description: "",
    status: "",
    assigned_to: "",
  });

  const { task_title, description, status, assigned_to } = input;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const opt = {
    //   method: "POST",
    //   body: JSON.stringify({
    //     task_title,
    //     description,
    //     status,
    //     assigned_to,
    //   }),
    // };

    try {
      // const res = await fetch(
      //   `http://localhost:5000/projects/${project_id}/tasks`,
      //   opt
      // );
      // //console.log(res);
      // addTasks(res);
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
              //value={task_title}
              name="task_title"
              //onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Task Name"
            />
          </div>
          <div className="col">
            <input
              //value={description}
              name="description"
              //onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Task Description"
            />
          </div>
          <div className="col">
            <input
              //value={status}
              name="status"
              //onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="status"
            />
          </div>

          <div className="col">
            <input
              //value={assigned_to}
              name="assigned_to"
              //onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="assigned_to"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            ADD TASKS
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTasks;
