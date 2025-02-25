import React, { useState } from "react";
import { Dimensions, StyleSheet, SafeAreaView, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import ShapeContainer from "../components/ShapeContainer";
import Button from "../components/Button";
import GridCanvas from "../screens/GridCanvas";

const { width, height } = Dimensions.get("screen");

function clamp(val: any, min: any, max: any) {
  return Math.min(Math.max(val, min), max);
}

export default function App() {
  const [resizable, setResizable] = useState(false);
  const [selectedShapeContainer, setSelectedShapeContainer] = useState<any[]>([]);
  const [shapeContainerVisible, setShapeContainerVisible] = useState(false);

  const numShapes = 100;
  const shapes = [];

  for (let i = 0; i < numShapes; i++) {
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);
    const scale = useSharedValue(1);
    const startScale = useSharedValue(1);
    const angle = useSharedValue(0);
    const startAngle = useSharedValue(0);

    shapes.push({
      translationX,
      translationY,
      prevTranslationX,
      prevTranslationY,
      scale,
      startScale,
      angle,
      startAngle,
    });
  }

  const pans = shapes.map((shape) => {
    return Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        shape.prevTranslationX.value = shape.translationX.value;
        shape.prevTranslationY.value = shape.translationY.value;
      })
      .onUpdate((event) => {
        const maxTranslateX = width / 2 - 50;
        const maxTranslateY = height / 2 - 50;
        shape.translationX.value = clamp(
          shape.prevTranslationX.value + event.translationX,
          -maxTranslateX,
          maxTranslateX
        );
        shape.translationY.value = clamp(
          shape.prevTranslationY.value + event.translationY,
          -maxTranslateY,
          maxTranslateY
        );
      })
      .runOnJS(true);
  });

  const pinches = shapes.map((shape) => {
    return Gesture.Pinch()
      .onStart(() => {
        shape.startScale.value = shape.scale.value;
      })
      .onUpdate((event) => {
        shape.scale.value = clamp(
          shape.startScale.value * event.scale,
          0.5,
          Math.min(width / 100, height / 100)
        );
      })
      .runOnJS(true);
  });

  const rotations = shapes.map((shape) => {
    return Gesture.Rotation()
      .onStart(() => {
        shape.startAngle.value = shape.angle.value;
      })
      .onUpdate((event) => {
        shape.angle.value = shape.startAngle.value + event.rotation;
      })
      .runOnJS(true);
  });

  const animatedStyles = shapes.map((shape) => {
    return useAnimatedStyle(() => ({
      transform: [
        { translateX: shape.translationX.value },
        { translateY: shape.translationY.value },
        { scale: shape.scale.value },
        { rotate: `${shape.angle.value}rad` },
      ],
    }));
  });

  const handleSelectedShape = (shape: string) => {
    setSelectedShapeContainer((prevState) => [...prevState, shape]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={styles.container}>
        <GridCanvas />
        {selectedShapeContainer.map((shape, index) => (
          <GestureDetector
            key={index}
            gesture={Gesture.Simultaneous(
              resizable ? pinches[index] : pans[index],
              rotations[index]
            )}
          >
            <Animated.View
              style={[
                animatedStyles[index],
                styles[shape as keyof typeof styles],
                resizable && { borderColor: "blue" },
              ]}
            ></Animated.View>
          </GestureDetector>
        ))}
      </GestureHandlerRootView>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Button
          title={resizable ? "Move" : "Resize"}
          onPress={() => setResizable(!resizable)}
          style={{ fontSize: 20 }}
        />
      </View>

      <View style={styles.ShapeContainer}>
        <Button
          onPress={() => setShapeContainerVisible(!shapeContainerVisible)}
          title={shapeContainerVisible ? "Close Shapes" : "Open Shapes"}
        />
        {shapeContainerVisible && (
          <ShapeContainer handleSelectedShape={handleSelectedShape} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#000",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
  },
  rectangle: {
    width: 100,
    height: 50,
    borderWidth: 2,
    borderColor: "#000",
  },
  line: {
    width: 200,
    height: 5,
    borderWidth: 2,

    backgroundColor: "#000", 
  },
  ShapeContainer: {
    marginBottom: 50,
    backgroundColor: "#EAEAEA",
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
