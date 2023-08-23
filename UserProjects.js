import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectModal from "../components/ProjectModal";
//import { createPortal } from "react-dom";
import Modal from "react-modal";

const UserProjects = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users-projects")
      .then((response) => {
        //console.log(response);
        // Structure data with projects grouped by user
        const usersWithProjects = response.data.reduce((acc, curr) => {
          if (!acc[curr.user_name]) {
            acc[curr.user_name] = {
              user_name: curr.user_name,
              user_email: curr.user_email,
              projects: [],
            };
          }
          acc[curr.user_name].projects.push(curr.project_name);
          return acc;
        }, {});

        // Convert object to array for rendering
        const usersArray = Object.values(usersWithProjects);

        setUsers(usersArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    //setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div>
      <h1>User Projects</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/user-projects">User Projects</Link> {/* New Link */}
      </div>
      <div>
        <h1>User List</h1>
        <table className="table table-dark table-striped">
          <thead className="table-dark">
            <tr className="bg-primary">
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Projects</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.user_name}>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>
                    <button onClick={() => handleOpenModal(user)}>
                      View Projects
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {showModal &&
          createPortal(
            <ProjectModal user={selectedUser} onClose={handleCloseModal} />,
            document.body
          )} */}
        <Modal
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          contentLabel="Projects Modal"
          ariaHideApp={false}
        >
          <ProjectModal user={selectedUser} onClose={handleCloseModal} />
        </Modal>
      </div>
    </div>
  );
};

export default UserProjects;
