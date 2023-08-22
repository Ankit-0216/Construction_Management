const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const data = await pool.query(`
        SELECT u.user_name, u.user_email, p.project_name
        FROM users u
        INNER JOIN userProjects up ON u.user_id = up.user_id
        INNER JOIN projects p ON up.project_id = p.project_id
      `);
    res.json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
