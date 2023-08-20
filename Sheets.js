import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { ProjectsContext } from "../context/ProjectsContext";

function Sheets() {
  let history = useHistory();

  const { selectedProject, setSelectedProject } = useContext(ProjectsContext);

  const handleSheets = (project_id) => {
    history.push(`/projects/${project_id}/sheets`);
  };

  return (
    <div>
      <button
        onClick={() => handleSheets(selectedProject.project_id)}
        className="btn btn-primary"
      >
        Sheets Page
      </button>
    </div>
  );
}

export default Sheets;
