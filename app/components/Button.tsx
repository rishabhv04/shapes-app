import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button(props: any) {
  const { onPress, title, style } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]} 
    >
      <Text style={styles.buttonText}>{title}</Text> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
