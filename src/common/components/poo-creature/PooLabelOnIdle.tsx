import { Animated, Text } from "react-native";
import { style } from "../../utils/style-utils";
import ProgressBar from "../fields/ProgressBar";

export default function PooLabelOnIdle({
  scaleValue,
}: {
  scaleValue: Animated.Value;
}) {
  return (
    <>
      <Animated.View
        style={[
          style.wFull,
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: scaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <Text
          style={[
            style.textLg,
            style.overflowHidden,
            {
              marginTop: 15,
              marginBottom: 5,
              fontWeight: "bold",
              textAlign: "center",
              maxHeight: 40,
              maxWidth: "90%",
            },
          ]}
        >
          Mr. PooPoo
        </Text>
        <ProgressBar
          max={20}
          current={17}
          appendText="5"
          height={20}
        ></ProgressBar>
      </Animated.View>
    </>
  );
}
