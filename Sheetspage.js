import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectFinder from "../apis/ProjectFinder";

const SheetsPage = () => {
  const { project_id } = useParams();
  const [images, setImages] = useState([]);
  //const [selectedProjectId, setSelectedProjectId] = useState(1);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await ProjectFinder.get(`/${project_id}/upload-images`);
      console.log(response.data.imageUrl);
      setImages(response.data.imageUrl);
    };
    fetchImage();
  }, [project_id]);

  //const handleUpload =

  // const handleUpload = async (event) => {
  //   const formData = new FormData();
  //   formData.append("image_file", event.target.files[0]);

  //   try {
  //     await axios.post(
  //       `/projects/${selectedProjectId}/upload-images`,
  //       formData
  //     );
  //     fetchImages(selectedProjectId);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  return (
    <div>
      <h1>SheetsPage</h1>
      <div>
        {images.map((imageUrl, index) => ({
          /* <img
            key={index}
            src={imageUrl.cloudinary_url}
            alt={`no images`}
            style={{ width: "200px", height: "auto", margin: "10px" }}
          /> */
        }))}
        <img
          src="http://res.cloudinary.com/dc6xvdopk/image/upload/v1692424718/files/nr863coxrofiruimos4m.jpg"
          style={{ width: "200px", height: "auto", margin: "10px" }}
        />
      </div>
      <h4>
        {" "}
        upload your images
        {/* <input onClick={handleUpload} type="file" /> */}
      </h4>
    </div>
  );
};

export default SheetsPage;
