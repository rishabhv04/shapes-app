import { Text, TouchableOpacity } from "react-native";

export default function Button(props: any) {
  const { onPress, title, style } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
}
