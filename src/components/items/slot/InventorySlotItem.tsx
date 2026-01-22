import { StyleProp, Text, View, ViewStyle } from "react-native";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { style } from "../../../utils/style-utils";
import ResourceIcon from "../../icons/ResourceIcon";
import { MathUtils } from "../../../utils/math-utils";
import { colors } from "../../../utils/color-utils";
import { Resources } from "../../../config/constants/Resources";

export default function InventorySlotItem({
  resource,
  value,
  viewStyle,
  showWhenEmpty,
}: {
  resource: Resources;
  value?: number;
  viewStyle?: StyleProp<ViewStyle>;
  showWhenEmpty?: boolean;
}) {
  const { get } = useResourcesStore();
  const _value = value ?? get(resource);

  if (_value <= 0 && !showWhenEmpty) return;
  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        { padding: 10, width: 60, height: 60, opacity: _value <= 0 ? 0.5 : 1 },
        viewStyle,
      ]}
    >
      <ResourceIcon resource={resource} size={40}></ResourceIcon>
      <Text
        style={[
          _value > 0 ? style.textShadowMd : [],
          {
            position: "absolute",
            bottom: 0,
            right: 0,
            fontWeight: 800,
            color: _value > 0 ? colors.white : colors.gray[700],
          },
        ]}
      >
        {_value >= 1000000
          ? MathUtils.convertToReduceStrFormat(_value)
          : _value}
      </Text>
    </View>
  );
}
