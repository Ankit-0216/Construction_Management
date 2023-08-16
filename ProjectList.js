import React, { useEffect, useContext } from "react";
import ProjectFinder from "../apis/ProjectFinder";
import { ProjectsContext } from "../context/ProjectsContext";

const ProjectList = (props) => {
  const { projects, setProjects, isAddButtonClicked } =
    useContext(ProjectsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectFinder.get("/", {
          headers: {
            token: localStorage.token,
          },
        });
        // console.log(response);
        setProjects(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [setProjects, isAddButtonClicked]);

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
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
          {projects.map((project, index) => {
            return (
              <tr key={index}>
                <td>{project.project_name}</td>
                <td>{project.address}</td>
                <td>{project.status}</td>
                <td>{project.deadline}</td>
                <td>
                  <button className="btn btn-warning">Update</button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
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
