import { View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import NumberField from "../../../common/components/fields/NumberField";
import StarIcon from "../../../common/components/icons/star";
import PooCoinIcon from "../../../common/components/icons/pooCoin";
import { useResourcesStore } from "../../../common/stores/resources.store";
import LevelProgressBar from "../../../common/components/fields/LevelProgressBar";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../utils/color-utils";

export default function AppTopBar() {
  const { width } = useWindowDimensions();
  const { stars, pooCoins } = useResourcesStore();

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
            style.justifyCenter,
            {
              justifyContent: "space-around",
              width: width,
              paddingVertical: 10,
            },
          ]}
        >
          <View style={[{ paddingRight: 5 }]}>
            <LevelProgressBar height={35} showProgressText></LevelProgressBar>
          </View>
          <NumberField
            value={stars}
            appendElement={<StarIcon size={40}></StarIcon>}
            useReduceNumberFormat
          ></NumberField>
          <NumberField
            value={pooCoins}
            appendElement={<PooCoinIcon size={40}></PooCoinIcon>}
            useReduceNumberFormat
          ></NumberField>
        </View>
      </View>
    </>
  );
}
