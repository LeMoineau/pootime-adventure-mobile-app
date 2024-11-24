import { Text, View } from "react-native";
import StandardButton from "../../../../common/components/buttons/StandardButton";
import PooCreatureHead from "../../../../common/components/misc/poo-creature/PooCreatureHead";
import { colors } from "../../../../common/utils/color-utils";
import { style } from "../../../../common/utils/style-utils";
import { usePooCreatureStyleStore } from "../../../../common/stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../../../common/stores/poo-creature-stats.store";

export default function HomeProfileButton({
  onPress,
}: {
  onPress?: () => void;
}) {
  const { name } = usePooCreatureStyleStore();
  const { level } = usePooCreatureStatsStore();
  return (
    <>
      <StandardButton
        style={[{ flex: 1, height: "100%" }]}
        viewStyle={[
          style.border,
          style.flexRow,
          style.justifyBetween,
          {
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 0,
            height: "100%",
          },
        ]}
        onPress={onPress}
      >
        <View style={[style.flexRow, style.justifyCenter, style.itemsCenter]}>
          <PooCreatureHead size={45}></PooCreatureHead>
          <View>
            <Text style={[style.textBold, { marginLeft: 10, fontSize: 15 }]}>
              {name}
            </Text>
            <Text
              style={[
                { color: colors.gray[500], marginLeft: 10, fontSize: 12 },
              ]}
            >
              Level {level}
            </Text>
          </View>
        </View>
      </StandardButton>
    </>
  );
}
