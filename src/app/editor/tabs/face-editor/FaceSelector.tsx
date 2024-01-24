import PooCoinIcon from "../../../../common/components/icons/pooCoin";
import { usePooCreatureStyleStore } from "../../../../common/stores/poo-creature-style.store";
import { colors } from "../../../../common/utils/color-utils";
import { style } from "../../../../common/utils/style-utils";
import { Image, Pressable, Text, View } from "react-native";
import EditSelector, { EditSelectorProps } from "../../EditSelector";
import { Resources } from "../../../../common/types/Resources";

export default function FaceSelector({
  uri,
  onRequestSelect,
  ...props
}: {
  uri: string;
  onRequestSelect?: (uri: string, price?: number, resource?: Resources) => void;
} & EditSelectorProps) {
  const { bodyColor } = usePooCreatureStyleStore();
  return (
    <EditSelector
      {...props}
      bgColor={bodyColor}
      onPress={() =>
        onRequestSelect && onRequestSelect(uri, props.price, props.resource)
      }
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
