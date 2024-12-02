import { ColorValue, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import PooCreatureHead from "./PooCreatureHead";
import { colors } from "../../../utils/color-utils";
import LevelProgressBar from "../../fields/LevelProgressBar";
import { usePooCreatureStyleStore } from "../../../stores/poo-creature-style.store";
import { PooHeadName } from "../../../types/shop/BuyableItem";

export default function PooCreatureBadge({
  showInfos,
  size,
  backgroundColor,
  useBodyColorForBackground,
  padding,
  border,
  borderColor,
  borderWidth,
  bodyColor,
  expression,
  head,
}: {
  showInfos?: boolean;
  size?: number;
  backgroundColor?: ColorValue;
  useBodyColorForBackground?: boolean;
  padding?: number;
  border?: boolean;
  borderColor?: ColorValue;
  borderWidth?: number;
  bodyColor?: string;
  expression?: string;
  head?: PooHeadName;
}) {
  const { name, bodyColor: bodyColorFromStore } = usePooCreatureStyleStore();
  return (
    <>
      <View
        style={[
          style.roundedFull,
          border
            ? {
                ...style.border,
                borderColor: colors.yellow[400],
                borderWidth: 3,
              }
            : {},
          {
            padding: padding ?? (size ? size / 10 : 20),
            backgroundColor: useBodyColorForBackground
              ? bodyColor ?? bodyColorFromStore
              : backgroundColor ?? colors.white,
            overflow: "hidden",
          },
        ]}
      >
        <PooCreatureHead
          size={size ?? 200}
          bodyColor={bodyColor}
          expression={expression}
          head={head}
        ></PooCreatureHead>
      </View>
      {showInfos && (
        <>
          <Text style={[style.textBold, style.textMd, { marginVertical: 10 }]}>
            {name}
          </Text>
          <LevelProgressBar></LevelProgressBar>
        </>
      )}
    </>
  );
}
