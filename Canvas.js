import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { useOnDraw } from "./Hooks";

import ProjectFinder from "../apis/ProjectFinder";

const Canvas = ({ width, height, coordinates, setCoordinates }) => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const canvasRef = useRef(null);

  const { project_id, image_id } = useParams();

  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await ProjectFinder.get(
          `/${project_id}/images/${image_id}`
        );
        //console.log(response.data.imageUrl);
        setBackgroundImageUrl(response.data.imageUrl);

        // const coordinatesResponse = await ProjectFinder.get(
        //   `/${project_id}/images/${image_id}/coordinates`
        // );
        // console.log(coordinatesResponse.data);
        // setCoordinates(coordinatesResponse.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchImage();
  }, [project_id, image_id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return; // Exit if the canvas element isn't available yet
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    if (backgroundImageUrl) {
      const img = new Image();
      img.src = backgroundImageUrl;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        drawSavedCoordinates(ctx);
      };
    }
  }, [backgroundImageUrl, coordinates, width, height]);

  function drawSavedCoordinates(ctx) {
    if (coordinates.length > 0) {
      console.log("Drawing saved coordinates:", coordinates);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;
      for (let i = 1; i < coordinates.length; i++) {
        console.log("Drawing line:", coordinates[i - 1], coordinates[i]);
        drawLine(coordinates[i - 1], coordinates[i], ctx, "#000000", 5);
      }
    }
  }

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
    setCoordinates((prevCoordinates) => [...prevCoordinates, point]);
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
