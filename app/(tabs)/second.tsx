import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Square = () => {
  // Initial center and size of the square
  const squareSize = 200;
  const centerX = width / 2;
  const centerY = height / 2;

  // Shared values for the points (corner and midpoints)
  const topLeft = useSharedValue({ x: centerX - squareSize / 2, y: centerY - squareSize / 2 });
  const topRight = useSharedValue({ x: centerX + squareSize / 2, y: centerY - squareSize / 2 });
  const bottomLeft = useSharedValue({ x: centerX - squareSize / 2, y: centerY + squareSize / 2 });
  const bottomRight = useSharedValue({ x: centerX + squareSize / 2, y: centerY + squareSize / 2 });

  const topMid = useSharedValue({ x: centerX, y: centerY - squareSize / 2 });
  const leftMid = useSharedValue({ x: centerX - squareSize / 2, y: centerY });
  const bottomMid = useSharedValue({ x: centerX, y: centerY + squareSize / 2 });
  const rightMid = useSharedValue({ x: centerX + squareSize / 2, y: centerY });

  // Handle the drag gesture
  const onGestureEvent = (event: any, point: any) => {
    point.value = { x: event.translationX + point.value.x, y: event.translationY + point.value.y };
  };

  const animatedStyle = (point: any) =>
    useAnimatedStyle(() => ({
      transform: [{ translateX: withSpring(point.value.x) }, { translateY: withSpring(point.value.y) }],
    }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.square}>
        {/* Corner Points */}
        <PanGestureHandler onGestureEvent={(event) => onGestureEvent(event, topLeft)}>
          <Animated.View style={[styles.point, animatedStyle(topLeft)]} />
        </PanGestureHandler>

        <PanGestureHandler onGestureEvent={(event) => onGestureEvent(event, topRight)}>
          <Animated.View style={[styles.point, animatedStyle(topRight)]} />
        </PanGestureHandler>

        <PanGestureHandler onGestureEvent={(event) => onGestureEvent(event, bottomLeft)}>
          <Animated.View style={[styles.point, animatedStyle(bottomLeft)]} />
        </PanGestureHandler>

        <PanGestureHandler onGestureEvent={(event) => onGestureEvent(event, bottomRight)}>
          <Animated.View style={[styles.point, animatedStyle(bottomRight)]} />
        </PanGestureHandler>

        {/* Midpoint Points */}
        <PanGestureHandler onGestureEvent={(event) => onGestureEvent(event, topMid)}>
          <Animated.View style={[styles.point, animatedStyle(topMid)]} />
        </PanGestureHandler>

        <PanGestureHandler onGestureEvent={(event) => onGestureEvent(event, leftMid)}>
          <Animated.View style={[styles.point, animatedStyle(leftMid)]} />
        </PanGestureHandler>

        <PanGestureHandler onGestureEvent={(event) => onGestureEvent(event, bottomMid)}>
          <Animated.View style={[styles.point, animatedStyle(bottomMid)]} />
        </PanGestureHandler>

        <PanGestureHandler onGestureEvent={(event) => onGestureEvent(event, rightMid)}>
          <Animated.View style={[styles.point, animatedStyle(rightMid)]} />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  square: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,      // Add border width
    borderColor: 'black', // Add black border color
  },
  point: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

export default Square;
