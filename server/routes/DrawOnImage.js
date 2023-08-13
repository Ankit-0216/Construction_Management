const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:image_id", async (req, res) => {
  const imageId = req.params.image_id;
  try {
    const result = await pool.query(
      "SELECT cloudinary_url FROM images WHERE image_id = $1",
      [imageId]
    );
    const imageUrl = result.rows[0].cloudinary_url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error fetching background image:", error);
    res.status(500).json({ error: "Image not Found" });
  }
});

module.exports = router;
