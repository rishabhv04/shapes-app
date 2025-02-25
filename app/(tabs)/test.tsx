import React, { useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 150,
  });

  const createPanResponder = (corner: any) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (corner === "topLeft") {
          const newWidth = rect.width - gestureState.dx;
          const newHeight = rect.height - gestureState.dy;
          if (newWidth > 0 && newHeight > 0) {
            setRect({
              x: rect.x + gestureState.dx,
              y: rect.y + gestureState.dy,
              width: newWidth,
              height: newHeight,
            });
          }
        } else if (corner === "topRight") {
          const newWidth = rect.width + gestureState.dx;
          const newHeight = rect.height - gestureState.dy;
          if (newWidth > 0 && newHeight > 0) {
            setRect({
              x: rect.x,
              y: rect.y + gestureState.dy,
              width: newWidth,
              height: newHeight,
            });
          }
        } else if (corner === "bottomLeft") {
          const newWidth = rect.width - gestureState.dx;
          const newHeight = rect.height + gestureState.dy;
          if (newWidth > 0 && newHeight > 0) {
            setRect({
              x: rect.x + gestureState.dx,
              y: rect.y,
              width: newWidth,
              height: newHeight,
            });
          }
        } else if (corner === "bottomRight") {
          const newWidth = rect.width + gestureState.dx;
          const newHeight = rect.height + gestureState.dy;
          if (newWidth > 0 && newHeight > 0) {
            setRect({
              x: rect.x,
              y: rect.y,
              width: newWidth,
              height: newHeight,
            });
          }
        }
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.rectangle,
          { left: rect.x, top: rect.y, width: rect.width, height: rect.height },
        ]}
      >
        {/* Top Left Corner */}
        <Animated.View
          {...createPanResponder("topLeft").panHandlers}
          style={[styles.corner, { left: rect.x - 10, top: rect.y - 10 }]} // Adjusted for corner
        />

        {/* Top Right Corner */}
        <Animated.View
          {...createPanResponder("topRight").panHandlers}
          style={[
            styles.corner,
            { left: rect.x + rect.width - 10, top: rect.y - 10 },
          ]} // Adjusted for corner
        />

        {/* Bottom Left Corner */}
        <Animated.View
          {...createPanResponder("bottomLeft").panHandlers}
          style={[
            styles.corner,
            { left: rect.x - 10, top: rect.y + rect.height - 10 },
          ]} // Adjusted for corner
        />

        {/* Bottom Right Corner */}
        <Animated.View
          {...createPanResponder("bottomRight").panHandlers}
          style={[
            styles.corner,
            { left: rect.x + rect.width - 10, top: rect.y + rect.height - 10 },
          ]} // Adjusted for corner
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  rectangle: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "blue",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 10,
  },
});
