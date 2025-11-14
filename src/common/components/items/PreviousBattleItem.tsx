import { Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";
import PooCreatureBadge from "../misc/poo-creature/PooCreatureBadge";
import LevelProgressBar from "../fields/LevelProgressBar";
import PooCreatureStatsTable from "../misc/poo-creature/PooCreatureStatsTable";

export default function PreviousBattleItem() {
  return (
    <View
      style={[
        style.border,
        { backgroundColor: colors.white, borderRadius: 10, overflow: "hidden" },
      ]}
    >
      <View
        style={[
          style.wFull,
          {
            backgroundColor: colors.green[400],
          },
        ]}
      >
        <View
          style={[style.flexRow, style.justifyBetween, style.itemsCenter, {}]}
        >
          <Text
            style={[
              {
                color: colors.white,
                fontWeight: "600",
                paddingHorizontal: 20,
                paddingVertical: 5,
                textTransform: "uppercase",
              },
            ]}
          >
            Victoire
          </Text>
          <Text
            style={[
              {
                color: colors.white,
                paddingRight: 20,
                fontSize: 12,
              },
            ]}
          >
            14/11/2025
          </Text>
        </View>
        <View
          style={[
            style.border,
            style.flexCol,
            { borderRadius: 10, backgroundColor: colors.white },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              { gap: 5, paddingHorizontal: 3 },
            ]}
          >
            <PooCreatureBadge size={50}></PooCreatureBadge>
            <View style={[style.flexRow, { flex: 1, gap: 5 }]}>
              <Text
                lineBreakMode="clip"
                numberOfLines={1}
                style={{ flex: 1, textAlign: "left", fontWeight: "600" }}
              >
                Mr. Poopoo
              </Text>
              <Text
                lineBreakMode="clip"
                numberOfLines={1}
                style={{ flex: 1, textAlign: "right", fontWeight: "600" }}
              >
                Mr. Poopoo
              </Text>
            </View>
            <PooCreatureBadge size={50}></PooCreatureBadge>
          </View>
          <View style={[style.flexRow, {}]}>
            <View style={{ flex: 1 }}>
              <PooCreatureStatsTable></PooCreatureStatsTable>
            </View>
            <View style={{ flex: 1 }}>
              <PooCreatureStatsTable></PooCreatureStatsTable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
