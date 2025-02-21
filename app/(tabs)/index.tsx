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
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import ShapeContainer from "../components/ShapeContainer";
import Button from "../components/Button";
import GridCanvas from "../screens/GridCanvas";

const { width, height } = Dimensions.get("screen");

function clamp(val: any, min: any, max: any) {
  return Math.min(Math.max(val, min), max);
}

export default function App() {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);
  const [resizable, setResizable] = useState(false);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [shapeContainerVisible, setShapeContainerVisible] = useState(false);
  const [selectedShapeContainer, setSelectedShapeContainer] = useState<any[]>(
    []
  );

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - 50;
      const maxTranslateY = height / 2 - 50;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    })
    .runOnJS(true);

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.5,
        Math.min(width / 100, height / 100)
      );
    })
    .runOnJS(true);

  const angle = useSharedValue(0);
  const startAngle = useSharedValue(0);

  const rotation = Gesture.Rotation()
    .onStart(() => {
      startAngle.value = angle.value;
    })
    .onUpdate((event) => {
      angle.value = startAngle.value + event.rotation;
    });

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}rad` }],
  }));

  const handleSelectedShape = (shape: string) => {
    setSelectedShape(shape);
    setSelectedShapeContainer((prevState) => [...prevState, shape]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={styles.container}>
        <GridCanvas />

        {selectedShapeContainer.map((shape, index) => (
          <GestureDetector
            key={index}
            gesture={Gesture.Simultaneous(!resizable ? pan : pinch, rotation)}
          >
            <Animated.View
              style={[
                animatedStyles,
                boxAnimatedStyles,
                styles[shape as keyof typeof styles],
                resizable && { borderColor: "blue" },
              ]}
            >
              <TouchableWithoutFeedback></TouchableWithoutFeedback>
            </Animated.View>
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
        {!shapeContainerVisible ? (
          <Button
            onPress={() => setShapeContainerVisible(true)}
            title={"Open Shapes"}
          />
        ) : (
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
  ShapeContainer: {
    marginBottom: 50,
    backgroundColor: "#EAEAEA",
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
