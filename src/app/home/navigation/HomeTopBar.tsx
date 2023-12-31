import { View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import NumberField from "../../../common/components/fields/NumberField";
import StarIcon from "../../../common/components/icons/star";
import PooCoinIcon from "../../../common/components/icons/pooCoin";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { useShallow } from "zustand/react/shallow";

export default function HomeTopBar() {
  const { width } = useWindowDimensions();
  const { stars, pooCoins } = useResourcesStore(
    useShallow((state) => ({ stars: state.stars, pooCoins: state.pooCoins }))
  );

  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        { width: width, position: "absolute", top: 20, left: 0 },
      ]}
    >
      <NumberField
        value={stars}
        appendElement={<StarIcon size={40}></StarIcon>}
        style={{ marginHorizontal: 10 }}
      ></NumberField>
      <NumberField
        value={pooCoins}
        appendElement={<PooCoinIcon size={40}></PooCoinIcon>}
      ></NumberField>
    </View>
  );
}
