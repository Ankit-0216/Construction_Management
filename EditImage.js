import React, { useState, useEffect } from "react";
import Canvas from "../components/Canvas";
import ProjectFinder from "../apis/ProjectFinder";
import { useParams } from "react-router-dom";

function EditImage() {
  const { project_id, image_id } = useParams();
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await ProjectFinder.get(
          `/${project_id}/images/${image_id}/coordinates`
        );
        console.log(response.data);
        setCoordinates(response.data);
      } catch (error) {
        console.error("Error fetching coordinates", error);
      }
    };

    fetchCoordinates();
  }, [project_id, image_id]);

  const handleSave = async () => {
    try {
      await ProjectFinder.put(
        `/${project_id}/images/${image_id}/save-coordinates`,
        { coordinates }
      );
      console.log("Coordinates saved successfully");
    } catch (error) {
      console.error("Error saving coordinates", error);
    }
  };

  return (
    <div>
      <h2>EditImage</h2>
      <div>
        <Canvas
          width={700}
          height={500}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
        <button onClick={handleSave} className="btn btn-primary">
          SAVE IMAGE
        </button>
      </div>
    </div>
  );
}

export default EditImage;
