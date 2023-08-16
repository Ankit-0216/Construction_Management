import React, { useState, createContext } from "react";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = (props) => {
  const [projects, setProjects] = useState([]);

  const addProjects = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, addProjects }}>
      {props.children}
    </ProjectsContext.Provider>
  );
};
