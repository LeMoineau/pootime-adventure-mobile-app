import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import { PooHeads } from "../../../common/types/PooHeads";
import { PooHeadName } from "../../../common/types/shop/BuyableItem";
import { CurveUtils } from "../../../common/utils/curve-utils";

export default function HeadSlotItem({ headName }: { headName: string }) {
  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        {
          width: 50,
          height: 50,
          backgroundColor: colors.gray[100],
          borderRadius: 5,
          overflow: "hidden",
        },
      ]}
    >
      {PooHeads[headName as PooHeadName]({
        fillColor: CurveUtils.calculateHeadColor(1),
        style: {
          width: 80,
          height: 80,
          transform: [{ translateY: 8 }],
        },
      })}
    </View>
  );
}
