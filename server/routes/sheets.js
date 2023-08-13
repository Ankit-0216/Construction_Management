const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const cloudinary = require("../cloudinary/cloudinary");
const fs = require("fs");

const pool = require("../db");

router.use("/", upload.array("image_file"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "files");
  if (req.method === "POST") {
    const urls = [];
    const files = req.files; // Get the uploaded files from the request

    for (const file of files) {
      const { path } = file; // Get the local file path of the uploaded file
      const newPath = await uploader(path); // Upload the file to Cloudinary and get the new URL

      urls.push(newPath); // Add the new URL to the array

      //to save the cloudinary URL and ID to psql database
      const cloudinaryUrl = newPath.url;
      const cloudinaryId = newPath.id;
      const query = `
          INSERT INTO images (cloudinary_url, cloudinary_id)
          VALUES ($1, $2)
          RETURNING image_id;
        `;
      const values = [cloudinaryUrl, cloudinaryId];

      try {
        const result = await pool.query(query, values);
        console.log(
          "Image saved to database with ID:",
          result.rows[0].image_id
        );
      } catch (error) {
        console.error("Error saving image to database", error);
      }

      fs.unlinkSync(path); // Delete the local file after uploading to Cloudinary
    }

    res.status(200).json({
      message: "Images uploaded successfully",
      data: urls,
    });
  } else {
    res.status(405).json({
      err: "Images not uploaded successfully",
    });
  }
});

router.get("/:image_id", async (req, res) => {
  const imageId = req.params.image_id;
  try {
    const query = "SELECT cloudinary_url FROM images WHERE image_id = $1 ";
    const result = await pool.query(query, [imageId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Image not Found" });
    } else {
      const imageUrl = result.rows[0].cloudinary_url;
      res.status(200).json({ imageUrl });
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

module.exports = router;
