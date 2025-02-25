import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

type Shape = "circle" | "square" | "rectangle" | "line";

interface ShapeContainerProps {
  handleSelectedShape: (shape: Shape) => void;
}

export default function ShapeContainer(props: ShapeContainerProps) {
  const { handleSelectedShape } = props;

  const shapes: Shape[] = ["circle", "square", "rectangle", "line"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {shapes.map((shape, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectedShape(shape)}
          style={[styles.shapeButton, styles[shape]]}
        >
          {/* Removed the Text component to remove the shape name */}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  shapeButton: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  square: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#000",
  },
  rectangle: {
    width: 60,
    height: 30,
    borderWidth: 2,
    borderColor: "#000",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
  },
  line: {
    width: 60,
    height: 2,
    backgroundColor: "#000",
  },
});
