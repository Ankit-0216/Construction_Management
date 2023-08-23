import React from "react";

const ProjectModal = ({ user, onClose }) => {
  console.log(user);
  return (
    <div>
      <h2>Projects Assigned to {user.user_name}</h2>
      <ul>
        {user.projects.map((project) => (
          <li key={project}>{project}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProjectModal;
