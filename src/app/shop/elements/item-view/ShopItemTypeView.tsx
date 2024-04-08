import { Image, View } from "react-native";
import {
  BuyableItem,
  BuyableItemValue,
  isResourceItemValue,
  isStringItemValue,
} from "../../../../common/types/shop/UnlockableItems";
import { style } from "../../../../common/utils/style-utils";
import { PooHeads } from "../../../../common/types/PooHeads";
import { CurveUtils } from "../../../../common/utils/curve-utils";
import { usePooCreatureStatsStore } from "../../../../common/stores/poo-creature-stats.store";
import TextWithResourceIcon from "../../../../common/components/text/TextWithResourceIcon";
import { MathUtils } from "../../../../common/utils/math-utils";

export default function ShopItemTypeView({
  itemType,
  itemValue,
}: {
  itemType: BuyableItem;
  itemValue: BuyableItemValue;
}) {
  const { level } = usePooCreatureStatsStore();

  return (
    <>
      {/* BODY COLORS */}
      {itemType === "bodyColors" && isStringItemValue(itemValue) && (
        <View
          style={[
            style.roundedFull,
            {
              width: 30,
              height: 30,
              backgroundColor: itemValue,
              transform: [{ rotateX: "20deg" }, { rotateY: "-20deg" }],
            },
          ]}
        ></View>
      )}

      {/* HEADS */}
      {itemType === "heads" &&
        isStringItemValue(itemValue) &&
        PooHeads[itemValue]({
          fillColor: CurveUtils.calculateHeadColor(level),
          style: {
            width: 80,
            height: 80,
            transform: [{ translateY: 8 }],
          },
        })}

      {/* FACES */}
      {itemType === "expressions" && isStringItemValue(itemValue) && (
        <Image
          source={{ uri: itemValue }}
          resizeMode="cover"
          style={{
            width: 90,
            height: 90,
            transform: [{ translateY: 20 }],
          }}
        ></Image>
      )}

      {/* RESOURCES */}
      {itemType === "resources" && isResourceItemValue(itemValue) && (
        <TextWithResourceIcon
          resource={itemValue.resource}
          fontSize={17}
          textStyle={[{ fontWeight: "500" }]}
          text={MathUtils.convertToReduceStrFormat(itemValue.number)}
        ></TextWithResourceIcon>
      )}
    </>
  );
}
