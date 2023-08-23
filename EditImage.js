import React, { useState } from "react";
import Canvas from "../components/Canvas";
//import ProjectFinder from "../apis/ProjectFinder";
//import { useParams } from "react-router-dom";

function EditImage() {
  // const { project_id, image_id } = useParams();
  // const [drawingCoordinates, setDrawingCoordinates] = useState([]);

  // const handleSave = async () => {
  //   try {
  //     await ProjectFinder.post(
  //       `/${project_id}/images/${image_id}/save-coordinates`,
  //       {
  //         coordinates: JSON.stringify(drawingCoordinates),
  //       }
  //     );
  //     console.log("Coordinates saved!");
  //   } catch (error) {
  //     console.error("Error saving coordinates", error);
  //   }
  // };

  return (
    <div>
      <h2>EditImage</h2>
      <div>
        <Canvas
          width={700}
          height={500}
          // drawingCoordinates={drawingCoordinates}
          // setDrawingCoordinates={setDrawingCoordinates}
        />
        <button className="btn btn-primary">SAVE IMAGE</button>
      </div>
    </div>
  );
}

export default EditImage;
