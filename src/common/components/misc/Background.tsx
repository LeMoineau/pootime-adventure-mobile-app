import { ImageBackground, View } from "react-native";
import { style } from "../../services/style-utils";

export default function Background() {
  return (
    <View
      style={[
        style.wFull,
        style.hFull,
        {
          position: "absolute",
          flex: 1,
          top: 0,
          left: 0,
          zIndex: -10,
          backgroundColor: "#FFE5A3",
        },
      ]}
    >
      <ImageBackground
        source={{ uri: "./../../../../assets/poo.svg" }}
        resizeMode="repeat"
        style={{ flex: 1 }}
      ></ImageBackground>
    </View>
  );
}
