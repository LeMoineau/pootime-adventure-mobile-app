import { Animated, Pressable, View } from "react-native";
import useAnimatedValue from "../../../../hooks/common/ui/use-animated-value";
import { style } from "../../../../constants/style/styles";
import StructureIcon from "../../../common/icons/StructureIcon";
import { Structure } from "../../../../types/village/Structure";
import { useVillageStore } from "../../../../stores/village.store";
import StructureCase from "./StructureCase";

export default function StructureView({
  structure,
  onStructurePress,
}: {
  structure: Structure;
  onStructurePress?: () => void;
}) {
  const { animValue, setEnabled } = useAnimatedValue({});
  const { get } = useVillageStore();

  return (
    <>
      <Pressable
        style={[{ marginHorizontal: 40 }]}
        onTouchStart={() => setEnabled(true)}
        onTouchEnd={() => setEnabled(false)}
        onPress={() => onStructurePress && onStructurePress()}
      >
        <Animated.View
          style={[
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            {
              transform: [
                {
                  scale: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.95],
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={[
              {
                transform: [
                  { translateY: structure.type === "toilet" ? -20 : 0 },
                ],
              },
            ]}
          >
            <StructureIcon
              structureName={structure.type}
              level={get(structure.type).level}
              size={100}
            ></StructureIcon>
          </View>
          <StructureCase></StructureCase>
        </Animated.View>
      </Pressable>
    </>
  );
}
