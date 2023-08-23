const express = require("express");
const router = express.Router();
const pool = require("../db"); // Your database connection module

router.post(
  "/:project_id/images/:image_id/save-coordinates",
  async (req, res) => {
    const { coordinates } = req.body;
    const { image_id } = req.params;
    const { project_id } = req.params;
    try {
      await pool.query(
        "UPDATE images SET coordinates = $1 WHERE project_id = $2, image_id = $3",
        [JSON.stringify(coordinates), project_id, image_id]
      );
      res.sendStatus(201);
    } catch (error) {
      console.error("Error saving coordinates", error);
      res.status(500).send("Error saving coordinates");
    }
  }
);

router.get("/coordinates/:project_id/images/:image_id", async (req, res) => {
  const { project_id, image_id } = req.params;
  try {
    const result = await db.query(
      "SELECT coordinates FROM images WHERE project_id = $1 AND image_id = $2",
      [project_id, image_id]
    );
    res.json(result.rows[0]?.coordinates || []);
  } catch (error) {
    console.error("Error fetching coordinates", error);
    res.status(500).send("Error fetching coordinates");
  }
});

module.exports = router;
