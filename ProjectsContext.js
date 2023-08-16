import React, { useState, createContext } from "react";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = (props) => {
  const [projects, setProjects] = useState([]);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(0);

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
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};
