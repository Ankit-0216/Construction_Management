const express = require("express");
const router = express.Router();
const pool = require("../db");

//Task Creation

router.post("/", async (req, res) => {
  try {
    const { task_title, description, status, type_of_task, assigned_to } =
      req.body;

    //inserting tasks
    const newTask = await pool.query(
      "INSERT INTO tasks (task_title, description, status, type_of_task, assigned_to) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [task_title, description, status, type_of_task, assigned_to]
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

router.get("/", async (req, res) => {
  try {
    //fetch all tasks from database
    const tasks = await pool.query("SELECT * FROM tasks");

    res.json(tasks.rows);
  } catch (error) {
    console.error("Error fetching tasks", error);
    res
      .status(500)
      .json({ message: "AN error occurred while fetching tasks." });
  }
});

//Fetching task details by id

router.get("/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;

    //fetch a specific task by ID
    const tasks = await pool.query("SELECT * FROM tasks WHERE tasks_id = $1", [
      task_id,
    ]);

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

router.put("/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const { task_title, description, status, type_of_task, assigned_to } =
      req.body;

    //update task in database
    const updatedTask = await pool.query(
      "UPDATE tasks SET task_title = $1, description = $2, status = $3, type_of_task = $4, assigned_to = $5 WHERE task_id = $6",
      [task_title, description, status, type_of_task, assigned_to, task_id]
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

router.delete("/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;

    //to check if task exists in the database

    const tasks = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [
      task_id,
    ]);
    if (tasks.rows.length[0] === 0) {
      return res.status(404).json({ message: "Task not Found" });
    }

    //to delete the task
    await pool.query("DELETE FROM tasks WHERE task_id = $1", [task_id]);

    res.json({ message: "Task Deleted Successfully." });
  } catch (error) {
    console.error("Error Deleting task", error);
    res
      .status(500)
      .json({ message: "AN error occured while deleting the task" });
  }
});

module.exports = router;
