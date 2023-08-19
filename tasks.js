const express = require("express");
const router = express.Router();
const pool = require("../db");

//Task Creation

router.post("/:project_id/tasks", async (req, res) => {
  try {
    const { task_title, description, status, type_of_task, assigned_to } =
      req.body;
    const { project_id } = req.params;

    //inserting tasks
    const newTask = await pool.query(
      "INSERT INTO tasks (task_title, description, status, type_of_task, assigned_to, project_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [task_title, description, status, type_of_task, assigned_to, project_id]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(500)
      .json({ message: " AN error occured while creating the task." });
  }
});

//Fetching task details

router.get("/:project_id/tasks", async (req, res) => {
  try {
    const { project_id } = req.params;
    //fetch all tasks from database
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE project_id = $1",
      [project_id]
    );

    res.json(tasks.rows);
  } catch (error) {
    console.error("Error fetching tasks", error);
    res
      .status(500)
      .json({ message: "AN error occurred while fetching tasks." });
  }
});

//Fetching task details by id

router.get("/:project_id/tasks/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const { project_id } = req.params;

    //fetch a specific task by ID
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE tasks_id = $1 AND project_id = $2",
      [task_id, project_id]
    );

    if (tasks.rows.length === 0) {
      return res.status(404).json({ message: "Task not Found." });
    }

    res.json(tasks.rows[0]);
  } catch (error) {
    console.error("Error fetching tasks", error);
    res.status(500).json({ message: "An error occurred while fetching task." });
  }
});

//Updating a particular task

router.put("/:project_id/tasks/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const { project_id } = req.params;
    const { task_title, description, status, type_of_task, assigned_to } =
      req.body;

    //update task in database
    const updatedTask = await pool.query(
      "UPDATE tasks SET task_title = $1, description = $2, status = $3, type_of_task = $4, assigned_to = $5 WHERE tasks_id = $6 AND project_id = $7 RETURNING *",
      [
        task_title,
        description,
        status,
        type_of_task,
        assigned_to,
        task_id,
        project_id,
      ]
    );

    if (updatedTask.rows.length == 0) {
      return res.status(404).json({ message: "Task not Found." });
    }

    res.json(updatedTask.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ message: "An Error occured while updating the task." });
  }
});

//Deleting a particular task

router.delete("/:project_id/tasks/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const { project_id } = req.params;

    //to check if task exists in the database

    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE tasks_id = $1 AND project_id = $2",
      [task_id, project_id]
    );
    if (tasks.rows.length[0] === 0) {
      return res.status(404).json({ message: "Task not Found" });
    }

    //to delete the task
    await pool.query("DELETE FROM tasks WHERE tasks_id = $1", [task_id]);

    res.json({ message: "Task Deleted Successfully." });
  } catch (error) {
    console.error("Error Deleting task", error);
    res
      .status(500)
      .json({ message: "AN error occured while deleting the task" });
  }
});

module.exports = router;
