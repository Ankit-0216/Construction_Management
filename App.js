import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateProjectPage from "./pages/UpdateProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import EditImage from "./pages/EditImage";
import UserProjects from "./pages/UserProjects";

import { ProjectsContextProvider } from "./context/ProjectsContext";
import { TasksContextProvider } from "./context/TasksContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/auth/is-verify", {
      method: "GET",
      headers: {
        token: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => (data === true ? setAuth(true) : setAuth(false)))
      .catch((err) => console.error(err.message));
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <ProjectsContextProvider>
      <TasksContextProvider>
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login {...props} setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Register {...props} setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/projects/:project_id/update"
              component={UpdateProjectPage}
            />
            <Route
              exact
              path="/projects/:project_id"
              component={ProjectDetailPage}
            />
            <Route
              exact
              path="/projects/:project_id/tasks/:task_id/update"
              component={UpdateTaskPage}
            />
            <Route
              exact
              path="/projects/:project_id/images/:image_id"
              component={EditImage}
            />
            <Route exact path="/user-projects" component={UserProjects} />
          </Switch>
        </Router>
      </TasksContextProvider>
    </ProjectsContextProvider>
  );
}

export default App;
