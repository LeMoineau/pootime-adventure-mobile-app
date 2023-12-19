import { Animated, Text } from "react-native";
import { style } from "../../../common/utils/style-utils";
import ProgressBar from "../../../common/components/fields/ProgressBar";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";

export default function PooLabelOnIdle({
  scaleValue,
}: {
  scaleValue: Animated.Value;
}) {
  const { name } = usePooCreatureStyleStore();

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
          {name}
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
