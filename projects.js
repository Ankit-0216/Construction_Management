const express = require("express");
const router = express.Router();
const pool = require("../db");

const authorization = require("../middleware/authorization");

//project creation

router.post("/", authorization, async (req, res) => {
  try {
    const { project_name, status, deadline, milestones, address } = req.body;
    const user_id = req.user;

    //inserting new projects in database
    const newProject = await pool.query(
      "INSERT INTO projects (project_name, status, deadline, milestones, address, project_manager_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [project_name, status, deadline, milestones, address, user_id]
    );
    res.status(201).json(newProject.rows[0]);
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "An error occured while creating the project." });
  }
});

//fetching all projects

router.get("/", authorization, async (req, res) => {
  try {
    // Fetch all projects from the database

    const user_id = req.user;

    const projects = await pool.query(
      "SELECT * FROM projects WHERE project_manager_id = $1",
      [user_id]
    );

    res.json({
      data: {
        projects: projects.rows,
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching projects." });
  }
});

//fetching a specific project by id

router.get("/:project_id", authorization, async (req, res) => {
  try {
    const { project_id } = req.params;
    const user_id = req.user;

    // Fetch a specific project by ID from the database
    const project = await pool.query(
      "SELECT * FROM projects WHERE project_id = $1 AND project_manager_id = $2",
      [project_id, user_id]
    );

    if (project.rows.length === 0) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json(project.rows[0]);
  } catch (error) {
    console.error("Error fetching project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the project." });
  }
});

//updating a specific project

router.put("/:project_id", authorization, async (req, res) => {
  try {
    const { project_id } = req.params;
    const { project_name, status, deadline, milestones, address } = req.body;
    const user_id = req.user;

    // Update the project in the database
    const updatedProject = await pool.query(
      "UPDATE projects SET project_name = $1, status = $2, deadline = $3, milestones = $4, address = $5 WHERE project_id = $6 AND project_manager_id = $7 RETURNING *",
      [project_name, status, deadline, milestones, address, project_id, user_id]
    );

    if (updatedProject.rows.length === 0) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json(updatedProject.rows[0]);
  } catch (error) {
    console.error("Error updating project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the project." });
  }
});

// deleting a specific project

router.delete("/:project_id", authorization, async (req, res) => {
  try {
    const { project_id } = req.params;
    const user_id = req.user;

    //to check if the project exists in the database
    const project = await pool.query(
      "SELECT * FROM projects WHERE project_id = $1 AND project_manager_id = $2",
      [project_id, user_id]
    );
    if (project.rows.length === 0) {
      return res.status(404).json({ message: "Project not Found" });
    }

    //to delete the project
    await pool.query("DELETE FROM projects WHERE project_id = $1", [
      project_id,
    ]);

    res.json({ message: "Project Deleted Successfully." });
  } catch (error) {
    console.error("Error Deleting Project", error);
    res
      .status(500)
      .json({ message: "An error occured while deleting the project" });
  }
});

module.exports = router;
