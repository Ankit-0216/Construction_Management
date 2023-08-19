import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import TasksComponent from "../components/TasksComponent";
import AddTasks from "../components/AddTasks";
import { ProjectsContext } from "../context/ProjectsContext";
import ProjectFinder from "../apis/ProjectFinder";
import { useHistory } from "react-router-dom";

const ProjectDetailPage = () => {
  const { project_id } = useParams();
  const { selectedProject, setSelectedProject } = useContext(ProjectsContext);
  const [isAddTasksModalOpen, setIsAddTasksModalOpen] = useState(false);

  let history = useHistory();

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

  const handleSheets = (project_id) => {
    history.push(`/projects/${project_id}/sheets`);
  };

  return (
    <div className="app">
      <h1>{`Your Project, ${selectedProject.project_name}`}</h1>
      <div>
        <button onClick={toggleAddTasksModal} className="btn btn-primary">
          Add Tasks
        </button>
      </div>

      <TasksComponent />
      <div>
        <button
          onClick={() => handleSheets(selectedProject.project_id)}
          className="btn btn-primary"
        >
          Sheets Page
        </button>
      </div>
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
