import PooCoinIcon from "../../../common/components/icons/pooCoin";
import { usePooCreatureStore } from "../../../common/stores/poo-creature.store";
import { colors } from "../../../common/utils/color-utils";
import { style } from "../../../common/utils/style-utils";
import { Image, Pressable, Text, View } from "react-native";
import EditSelector, { EditSelectorProps } from "../EditSelector";

export default function FaceSelector({
  uri,
  onRequestSelect,
  ...props
}: {
  uri: string;
  onRequestSelect?: (uri: string, price?: number) => void;
} & EditSelectorProps) {
  const { bodyColor } = usePooCreatureStore();
  return (
    <EditSelector
      {...props}
      bgColor={bodyColor}
      onPress={() => onRequestSelect && onRequestSelect(uri, props.price)}
    >
      <Image
        source={{ uri: uri }}
        resizeMode="cover"
        style={{
          width: 80,
          height: 80,
        }}
      ></Image>
    </EditSelector>
  );
}
