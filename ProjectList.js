import React, { useEffect, useContext } from "react";
import ProjectFinder from "../apis/ProjectFinder";
import { ProjectsContext } from "../context/ProjectsContext";
import { useHistory } from "react-router-dom";

const ProjectList = () => {
  const { projects, setProjects, isAddButtonClicked } =
    useContext(ProjectsContext);

  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectFinder.get("/", {
          headers: {
            token: localStorage.token,
          },
        });
        setProjects(response.data.data.projects);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [setProjects, isAddButtonClicked]);

  const handleDelete = async (e, project_id) => {
    e.stopPropagation();
    try {
      await ProjectFinder.delete(`/${project_id}`, {
        headers: {
          token: localStorage.token,
        },
      });
      //console.log(response);
      setProjects(
        projects.filter((project) => {
          return project.project_id !== project_id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = (e, project_id) => {
    e.stopPropagation();
    history.push(`/projects/${project_id}/update`);
  };

  const handleProjectSelect = (project_id) => {
    history.push(`/projects/${project_id}`);
  };

  return (
    <div className="list-group">
      <table className="table table-dark table-striped">
        <thead className="table-dark">
          <tr className="bg-primary">
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Status</th>
            <th scope="col">Deadline</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            return (
              <tr
                onClick={() => handleProjectSelect(project.project_id)}
                key={project.project_id}
              >
                <td>{project.project_name}</td>
                <td>{project.address}</td>
                <td>{project.status}</td>
                <td>{project.deadline}</td>
                <td>
                  <button
                    onClick={(e) => handleUpdate(e, project.project_id)}
                    className="btn btn-warning"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(e, project.project_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          {/* <tr>
            <td>project 1</td>
            <td>abcdefgh</td>
            <td>OPEN</td>
            <td>19/08/2023</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
