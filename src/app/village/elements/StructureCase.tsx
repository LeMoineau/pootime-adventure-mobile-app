import { View } from "react-native";

export default function StructureCase({ even }: { even?: boolean }) {
  return (
    <>
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
    </>
  );
}
