import { View } from "react-native";
import { colors } from "../../../../utils/color-utils";

export default function NodeShadow({ shadowColor }: { shadowColor?: string }) {
  return (
    <View
      style={[
        {
          position: "absolute",
          bottom: "-45%",
          left: 0,
          width: "100%",
          paddingTop: "100%",
          backgroundColor: shadowColor ?? colors.black,
          zIndex: -5,
          borderRadius: 150,
          transform: [{ rotateX: "75deg" }],
          opacity: 0.5,
        },
      ]}
    ></View>
  );
}
