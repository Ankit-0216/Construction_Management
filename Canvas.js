import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useOnDraw } from "./Hooks";

import ProjectFinder from "../apis/ProjectFinder";

const Canvas = ({ width, height }) => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const { project_id } = useParams();
  const { image_id } = useParams();

  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await ProjectFinder.get(
          `/${project_id}/images/${image_id}`
        );
        //console.log(response.data.imageUrl);
        setBackgroundImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchImage();
  }, [project_id, image_id]);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  const canvasStyle = {
    border: "1px solid black",
    width: "700px",
    height: "500px",
    backgroundImage: `url('${backgroundImageUrl}')`,
    backgroundSize: "cover", // T0 cover the canvas entirely
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas
        width={width}
        height={height}
        onMouseDown={onCanvasMouseDown}
        style={canvasStyle}
        ref={setCanvasRef}
      />
    </div>
  );
};

export default Canvas;
