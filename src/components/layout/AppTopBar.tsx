import { View, useWindowDimensions } from "react-native";
import { style } from "../../utils/style-utils";
import NumberField from "../fields/NumberField";
import StarIcon from "../icons/resources/star";
import PooCoinIcon from "../icons/resources/pooCoin";
import { useResourcesStore } from "../../common/stores/resources.store";
import LevelProgressBar from "../fields/LevelProgressBar";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../utils/color-utils";

export default function AppTopBar() {
  const { width } = useWindowDimensions();
  const { get } = useResourcesStore();

  return (
    <>
      <View
        style={[
          {
            backgroundColor: colors.baseBackgroundColor,
          },
        ]}
      >
        <LinearGradient
          colors={[colors.yellow[400], "transparent"]}
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            },
          ]}
        ></LinearGradient>
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            style.justifyBetween,
            {
              width: width,
              paddingBottom: 10,
              paddingTop: 20,
              paddingHorizontal: 10,
              boxSizing: "border-box",
              gap: 5,
            },
          ]}
        >
          <LevelProgressBar
            style={{ flex: 1.3 }}
            height={35}
            width={"100%"}
            showProgressText
          ></LevelProgressBar>
          <NumberField
            style={[{ flex: 1 }]}
            value={get("stars")}
            appendElement={<StarIcon size={40}></StarIcon>}
            useReduceNumberFormat
          ></NumberField>
          <NumberField
            style={[{ flex: 1 }]}
            value={get("pooCoins")}
            appendElement={<PooCoinIcon size={40}></PooCoinIcon>}
            useReduceNumberFormat
          ></NumberField>
        </View>
      </View>
    </>
  );
}
