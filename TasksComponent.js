import React, { useEffect, useContext, useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import TaskFinder from "../apis/TaskFinder";
import { TasksContext } from "../context/TasksContext";
import UpdateTask from "../components/UpdateTask";

const TasksComponent = () => {
  const { project_id } = useParams();

  const { tasks, setTasks, isAddButtonClicked } = useContext(TasksContext);

  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TaskFinder.get(`/${project_id}/tasks`);
        console.log(response);
        setTasks(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [project_id, setTasks, isAddButtonClicked]);

  const handleDelete = async (e, tasks_id) => {
    e.stopPropagation();
    try {
      await TaskFinder.delete(`/${project_id}/tasks/${tasks_id}`);
      //console.log(response);
      setTasks(
        tasks.filter((task) => {
          return task.tasks_id !== tasks_id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  // const handleUpdate = (e, project_id) => {
  //   e.stopPropagation();
  //   history.push(`/projects/${project_id}/update`);
  // };

  // const handleProjectSelect = (project_id) => {
  //   history.push(`/projects/${project_id}`);
  // };

  const toggleUpdateTaskModal = () => {
    setIsUpdateTaskModalOpen(!isUpdateTaskModalOpen);
  };

  return (
    <div className="list-group">
      <table className="table table-dark table-striped">
        <thead className="table-dark">
          <tr className="bg-primary">
            <th scope="col">Task Title</th>
            <th scope="col">Status</th>
            <th scope="col">Type of task</th>
            <th scope="col">Assigned to</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.tasks_id}>
                <td>{task.task_title}</td>
                <td>{task.status}</td>
                <td>{task.type_of_task}</td>
                <td>{task.assigned_to}</td>
                <td>
                  <button
                    onClick={toggleUpdateTaskModal}
                    className="btn btn-warning"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(e, task.tasks_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
                <Modal
                  isOpen={isUpdateTaskModalOpen}
                  onRequestClose={toggleUpdateTaskModal}
                  contentLabel="Add Task Modal"
                >
                  <UpdateTask closeModal={toggleUpdateTaskModal} />
                </Modal>
              </tr>
            );
          })}
          {/* <tr>
            <td>Task 1</td>
            <td>open</td>
            <td>issue</td>
            <td>user-1</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Task 2</td>
            <td>closed</td>
            <td>planned Work</td>
            <td>user-2</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default TasksComponent;
