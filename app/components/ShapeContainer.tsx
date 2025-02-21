import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

// Define the type for valid shape names
type Shape = "circle" | "square" | "rectangle";

interface ShapeContainerProps {
  handleSelectedShape: (shape: Shape) => void;
}

export default function ShapeContainer(props: ShapeContainerProps) {
  const { handleSelectedShape } = props;

  const shapes: Shape[] = ["circle", "square", "rectangle"];

  return (
    <>
      {shapes.map((shape, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectedShape(shape)}
          style={[styles[shape]]}
        ></TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "#000",
    margin: 10,
  },
  rectangle: {
    width: 40,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    margin: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
    margin: 10,
  },
});
