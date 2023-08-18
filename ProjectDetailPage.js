import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import TasksComponent from "../components/TasksComponent";
import AddTasks from "../components/AddTasks";
import { ProjectsContext } from "../context/ProjectsContext";
import ProjectFinder from "../apis/ProjectFinder";

const ProjectDetailPage = () => {
  const { project_id } = useParams();
  const { selectedProject, setSelectedProject } = useContext(ProjectsContext);
  const [isAddTasksModalOpen, setIsAddTasksModalOpen] = useState(false);

  const toggleAddTasksModal = () => {
    setIsAddTasksModalOpen(!isAddTasksModalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProjectFinder.get(`/${project_id}`, {
        headers: {
          token: localStorage.token,
        },
      });
      //console.log(response);
      setSelectedProject(response.data);
    };
    fetchData();
  }, [setSelectedProject, project_id]);

  return (
    <div className="app">
      <h1>{`Your Project, ${selectedProject.project_name}`}</h1>
      <div>
        <button onClick={toggleAddTasksModal} className="btn btn-primary">
          Add Tasks
        </button>
      </div>
      <TasksComponent />
      <Modal
        isOpen={isAddTasksModalOpen}
        onRequestClose={toggleAddTasksModal}
        contentLabel="Add Tasks Modal"
      >
        <AddTasks closeModal={toggleAddTasksModal} />
      </Modal>
    </div>
  );
};

export default ProjectDetailPage;
