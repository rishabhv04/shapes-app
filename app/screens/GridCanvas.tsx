import React, { useLayoutEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import Canvas from "react-native-canvas";

const { width: initialWidth, height: initialHeight } = Dimensions.get("window");

const GridCanvas = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight });

  // Function to draw the grid
  const drawGrid = (canvas: any, width: number, height: number) => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      const gridSize = 20;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "lightgray";
      ctx.lineWidth = 1;

      // Draw vertical grid lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
  };

  // Use useLayoutEffect to draw the grid when the component mounts
  useLayoutEffect(() => {
    if (canvasRef.current) {
      drawGrid(canvasRef.current, dimensions.width, dimensions.height);
    }

    // Resize handler for screen dimension changes
    const handleResize = (event: { window: { width: number; height: number } }) => {
      const { width, height } = event.window;
      setDimensions({ width, height });
    };

    // Add event listener for dimension changes
    const subscription = Dimensions.addEventListener("change", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      subscription?.remove();
    };
  }, [dimensions]);

  return <Canvas ref={canvasRef} style={{ position: "absolute", top: 0 }} />;
};

export default GridCanvas;
