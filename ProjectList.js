import React, { useEffect, useState } from "react";
//import ProjectFinder from "../apis/ProjectFinder";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  async function getProject() {
    try {
      const res = await fetch("http://localhost:5000/projects/12", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const data = await res.json();
      if (data.project_name) {
        setProjects(data.project_name);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    console.log(getProject);
    getProject();
  });

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
          <tr>
            <td>{projects}</td>
            <td>abcdefgh</td>
            <td>OPEN</td>
            <td>19/08/2023</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
