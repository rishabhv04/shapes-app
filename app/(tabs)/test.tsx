import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Canvas from "react-native-canvas";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const GridCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const drawGrid = (canvas: any) => {
      if (canvas) {
        const ctx = canvas.getContext("2d");

        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        const width = canvas.width;
        const height = canvas.height;
        const gridSize = 20;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "lightgray";
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = 0; y <= height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }
    };

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      drawGrid(canvas);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Canvas ref={canvasRef} style={styles.canvas} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default GridCanvas;
