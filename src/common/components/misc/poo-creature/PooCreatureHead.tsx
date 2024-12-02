import { View } from "react-native";
import PooCreature from "./PooCreature";
import { style } from "../../../utils/style-utils";
import { PooHeadName } from "../../../types/shop/BuyableItem";

export default function PooCreatureHead({
  size,
  bodyColor,
  expression,
  head,
}: {
  size?: number;
  bodyColor?: string;
  expression?: string;
  head?: PooHeadName;
}) {
  return (
    <View style={[style.overflowHidden, { width: size, height: size }]}>
      <PooCreature
        width={size}
        onlyHead
        bodyColorProps={bodyColor}
        expressionProps={expression}
        headProps={head}
      ></PooCreature>
    </View>
  );
}
