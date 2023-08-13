const express = require("express");
const router = express.Router();
const pool = require("../db");

//project creation

router.post("/", async (req, res) => {
  try {
    const { project_name, status, deadline, milestones, address } = req.body;

    //inserting new projects in database
    const newProject = await pool.query(
      "INSERT INTO projects (project_name, status, deadline, milestones, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [project_name, status, deadline, milestones, address]
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

router.get("/", async (req, res) => {
  try {
    // Fetch all projects from the database

    const projects = await pool.query("SELECT * FROM projects");

    res.json(projects.rows);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching projects." });
  }
});

//fetching a specific project by id

router.get("/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;

    // Fetch a specific project by ID from the database
    const project = await pool.query(
      "SELECT * FROM projects WHERE project_id = $1",
      [project_id]
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

router.put("/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;
    const { project_name, status, deadline, milestones, address } = req.body;

    // Update the project in the database
    const updatedProject = await pool.query(
      "UPDATE projects SET project_name = $1, status = $2, deadline = $3, milestones = $4, address = $5 WHERE project_id = $6 RETURNING *",
      [project_name, status, deadline, milestones, address, project_id]
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

router.delete("/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;

    //to check if the project exists in the database
    const project = await pool.query(
      "SELECT * FROM projects WHERE project_id = $1",
      [project_id]
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
