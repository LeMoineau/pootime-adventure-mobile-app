import { View } from "react-native";
import { colors } from "../../../../../utils/color-utils";

export default function StructureCase({ even }: { even?: boolean }) {
  return (
    <View
      style={[
        {
          width: "100%",
          height: 0,
          paddingTop: "100%",
          marginTop: "-82%",
          transform: [{ rotateX: "45deg" }],
          backgroundColor: colors.gray[800],
          opacity: 0.6,
          borderRadius: "100%",
          zIndex: -1,
        },
      ]}
    ></View>
  );
  return (
    <View
      style={[
        {
          width: "125%",
          height: 0,
          paddingTop: "125%",
          marginTop: "-100%",
          transform: [{ rotateX: "50deg" }, { rotate: "45deg" }],
          backgroundColor: even ? "89d359ff" : "#a4dd7fff",
          zIndex: -1,
        },
      ]}
    ></View>
  );
}
