import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ProjectFinder from "../apis/ProjectFinder";

function Sheets() {
  const { project_id } = useParams();

  const [images, setImages] = useState([]);

  const fetchImage = async () => {
    try {
      const response = await ProjectFinder.get(`/${project_id}/images`);
      console.log(response.data.imageUrl);
      setImages(response.data.imageUrl);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [project_id]);

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("image_file", e.target.files[0]);

    const opt = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/projects/${project_id}/upload-images`,
        opt
      );
      console.log(response);
      fetchImage();
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div>
      <h1>Sheets Page</h1>
      <div>
        <h4>
          {" "}
          upload your image
          <input onClick={handleUpload} type="file" />
        </h4>
        {images.map((imageUrl, index) => (
          <div key={index}>
            <Link
              to={`/projects/${imageUrl.project_id}/images/${imageUrl.image_id}`}
            >
              <img
                src={imageUrl.cloudinary_url}
                alt={`Unable to load`}
                style={{ width: "200px", height: "auto", margin: "10px" }}
              />
            </Link>
          </div>
        ))}
        {/* <img
          src="http://res.cloudinary.com/dc6xvdopk/image/upload/v1692424718/files/nr863coxrofiruimos4m.jpg"
          style={{ width: "200px", height: "auto", margin: "10px" }}
        /> */}
      </div>
    </div>
  );
}

export default Sheets;
