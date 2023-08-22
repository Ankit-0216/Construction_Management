import React, { useState } from "react";
import TasksComponent from "../components/TasksComponent";
import Modal from "react-modal";

import AddTasks from "../components/AddTasks";

const Tasks = () => {
  const [isAddTasksModalOpen, setIsAddTasksModalOpen] = useState(false);

  const toggleAddTasksModal = () => {
    setIsAddTasksModalOpen(!isAddTasksModalOpen);
  };

  return (
    <div className="container">
      <div>
        <button className="btn btn-primary" onClick={toggleAddTasksModal}>
          Add Tasks
        </button>
      </div>

      <TasksComponent />

      <Modal
        isOpen={isAddTasksModalOpen}
        onRequestClose={toggleAddTasksModal}
        contentLabel="Add Tasks Modal"
        ariaHideApp={false}
      >
        <AddTasks closeModal={toggleAddTasksModal} />
      </Modal>
    </div>
  );
};

export default Tasks;
