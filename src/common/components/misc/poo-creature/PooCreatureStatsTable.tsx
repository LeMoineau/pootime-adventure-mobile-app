import { StyleProp, Text, View, ViewStyle } from "react-native";
import { style } from "../../../utils/style-utils";
import { PooCreatureStats } from "../../../types/PooCreatureStats";
import { colors } from "../../../utils/color-utils";
import StatIcon from "../../icons/StatIcon";

export default function PooCreatureStatsTable({
  stats,
  viewStyle,
}: {
  stats: PooCreatureStats;
  viewStyle?: StyleProp<ViewStyle>;
}) {
  function StatField({ statKey }: { statKey: keyof PooCreatureStats }) {
    return (
      <View
        style={[
          style.border,
          style.flexRow,
          { borderRadius: 8, backgroundColor: colors.white },
        ]}
      >
        <StatIcon
          statKey={statKey}
          size={24}
          style={[
            {
              position: "absolute",
              transform: [{ translateY: -2 }],
              zIndex: 5,
            },
          ]}
        ></StatIcon>
        <Text style={[{ textAlign: "center", flex: 1, paddingLeft: 15 }]}>
          {stats[statKey]}
        </Text>
      </View>
    );
  }

  return (
    <View style={[style.flexRow, { gap: 10 }, viewStyle]}>
      <View style={[{ flex: 1, gap: 5 }]}>
        <StatField statKey="pv"></StatField>
        <StatField statKey="attaque"></StatField>
        <StatField statKey="defense"></StatField>
      </View>
      <View style={[{ flex: 1, gap: 5 }]}>
        <StatField statKey="mana"></StatField>
        <StatField statKey="recupMana"></StatField>
        <StatField statKey="resMana"></StatField>
      </View>
    </View>
  );
}
