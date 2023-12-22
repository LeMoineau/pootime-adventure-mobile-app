import PooCoinIcon from "../../../common/components/icons/pooCoin";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { colors } from "../../../common/utils/color-utils";
import { style } from "../../../common/utils/style-utils";
import { Image, Pressable, Text, View } from "react-native";
import EditSelector, { EditSelectorProps } from "../EditSelector";
import { PooHeads } from "../../../common/types/PooHeads";
import { MathUtils } from "../../../common/utils/math-utils";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";

export default function HeadSelector({
  name,
  onRequestSelect,
  ...props
}: {
  name: string;
  onRequestSelect?: (name: string, price?: number) => void;
} & EditSelectorProps) {
  const { level } = usePooCreatureStatsStore();
  return (
    <EditSelector
      {...props}
      bgColor={colors.white}
      onPress={() => onRequestSelect && onRequestSelect(name, props.price)}
    >
      {PooHeads[name]({
        fillColor: MathUtils.calculateHeadColorFromLevel(level),
        style: {
          width: 80,
          height: 80,
        },
      })}
    </EditSelector>
  );
}
