import { View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import NumberField from "../../../common/components/fields/NumberField";
import StarIcon from "../../../common/components/icons/star";
import PooCoinIcon from "../../../common/components/icons/pooCoin";
import { useResourcesStore } from "../../../common/stores/resources.store";
import PillButton from "../../../common/components/buttons/PillButton";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../common/utils/color-utils";

export default function HomeTopBar() {
  const { width } = useWindowDimensions();
  const { stars, pooCoins } = useResourcesStore();

  return (
    <View
      style={[
        style.flexRow,
        style.itemsCenter,
        {
          justifyContent: "space-between",
          width: width,
          paddingTop: 10,
          paddingHorizontal: 10,
        },
      ]}
    >
      <View></View>
      <View style={[style.flexRow]}>
        <NumberField
          value={stars}
          appendElement={<StarIcon size={40}></StarIcon>}
          style={[{ marginRight: 15 }]}
          useReduceNumberFormat
        ></NumberField>
        <NumberField
          value={pooCoins}
          appendElement={<PooCoinIcon size={40}></PooCoinIcon>}
          useReduceNumberFormat
        ></NumberField>
      </View>
      <PillButton style={[{ marginRight: 5 }]} styleView={[{ borderWidth: 0 }]}>
        <Ionicons name="person" size={35} color={colors.gray[800]}></Ionicons>
      </PillButton>
    </View>
  );
}
