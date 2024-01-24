import PooCoinIcon from "../../../../common/components/icons/pooCoin";
import { colors } from "../../../../common/utils/color-utils";
import { style } from "../../../../common/utils/style-utils";
import { Pressable, Text, View } from "react-native";
import EditSelector, { EditSelectorProps } from "../../EditSelector";

export default function ColorSelector({
  color,
  onRequestSelect,
  ...props
}: {
  color: string;
  onRequestSelect?: (color: string, price?: number) => void;
} & EditSelectorProps) {
  return (
    <EditSelector
      {...props}
      bgColor={color}
      onPress={() => onRequestSelect && onRequestSelect(color, props.price)}
    ></EditSelector>
  );
}
