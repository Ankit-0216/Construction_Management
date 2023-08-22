import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProjectsContext } from "../context/ProjectsContext";
import ProjectFinder from "../apis/ProjectFinder";

import Tasks from "../components/Tasks";
import Sheets from "../components/Sheets";
//import SheetsPage from "./SheetsPage";

const ProjectDetailPage = () => {
  const { project_id } = useParams();
  const [currentTab, setCurrentTab] = useState(0);

  const { selectedProject, setSelectedProject } = useContext(ProjectsContext);

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

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return <Tasks />;
      case 1:
        return <Sheets />;
      default:
        return <></>;
    }
  };

  return (
    <div className="container">
      <h1>{`Your Project, ${selectedProject.project_name}`}</h1>

      <div className="tabs">
        <h2
          style={currentTab === 0 ? { textDecoration: "underline" } : {}}
          onClick={() => setCurrentTab(0)}
        >
          Tasks
        </h2>
        <h2
          style={currentTab === 1 ? { textDecoration: "underline" } : {}}
          onClick={() => setCurrentTab(1)}
        >
          Sheets
        </h2>
      </div>

      {renderSwitch(currentTab)}
    </div>
  );
};

export default ProjectDetailPage;
