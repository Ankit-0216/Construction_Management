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
import UpdateProject from "./pages/UpdateProject";
import ProjectDetailPage from "./pages/ProjectDetailPage";
// import { ProjectContextProvider } from "./context/ProjectContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/auth/is-verify/", {
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
    <Router>
      <div className="container">
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
          <Route exact path="/projects/:id/update" component={UpdateProject} />
          <Route exact path="/projects/:id" component={ProjectDetailPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
