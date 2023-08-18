import React, { useState, createContext } from "react";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = (props) => {
  const [projects, setProjects] = useState([]);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(0);
  const [selectedProject, setSelectedProject] = useState([]);

  const addProjects = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        addProjects,
        isAddButtonClicked,
        setIsAddButtonClicked,
        selectedProject,
        setSelectedProject,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};
