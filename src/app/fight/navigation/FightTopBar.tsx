import { View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import NumberField from "../../../common/components/fields/NumberField";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { useShallow } from "zustand/react/shallow";
import StarIcon from "../../../common/components/icons/star";
import ProgressBar from "../../../common/components/fields/ProgressBar";
import LevelProgressBar from "../../../common/components/fields/LevelProgressBar";

export default function FightTopBar() {
  const { width } = useWindowDimensions();
  const { stars } = useResourcesStore(
    useShallow((state) => ({ stars: state.stars, pooCoins: state.pooCoins }))
  );

  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        {
          width: width,
          position: "absolute",
          top: 20,
          left: 0,
          paddingHorizontal: 20,
        },
      ]}
    >
      <LevelProgressBar
        height={35}
        width={"100%"}
        style={{ flex: 1, marginRight: 20 }}
        showProgressText
      ></LevelProgressBar>
      <NumberField
        value={stars}
        appendElement={<StarIcon size={40}></StarIcon>}
      ></NumberField>
    </View>
  );
}
