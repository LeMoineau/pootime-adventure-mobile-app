import { View } from "react-native";

export default function StructureView({
  position,
  size,
}: {
  position: [number, number];
  size: number;
}) {
  return (
    <>
      <View
        style={[
          {
            position: "absolute",
            top: position[0],
            left: position[1],
            width: size,
            height: size,
            backgroundColor: "blue",
          },
        ]}
      ></View>
    </>
  );
}
