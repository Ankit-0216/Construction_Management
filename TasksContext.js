import React, { useState, createContext } from "react";

export const TasksContext = createContext();

export const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(0);

  const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(0);

  const addTasks = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTasks,
        isAddButtonClicked,
        setIsAddButtonClicked,
        isUpdateButtonClicked,
        setIsUpdateButtonClicked,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
