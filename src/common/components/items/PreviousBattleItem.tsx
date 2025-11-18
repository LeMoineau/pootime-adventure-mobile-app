import { Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";
import PooCreatureBadge from "../misc/poo-creature/PooCreatureBadge";
import PooCreatureStatsTable from "../misc/poo-creature/PooCreatureStatsTable";
import UltiItem from "./UltiItem";
import { BattleFinalState } from "../../types/battle/BattleFinalState";

export default function PreviousBattleItem({
  battle,
}: {
  battle: BattleFinalState;
}) {
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
            backgroundColor: battle.win ? colors.green[400] : colors.red[400],
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
            {battle.win ? "Victoire" : "Défaite"}
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
            {battle.date}
          </Text>
        </View>
        <View
          style={[
            style.border,
            style.flexCol,
            { borderRadius: 10, backgroundColor: colors.gray[50] },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              { gap: 5, paddingHorizontal: 3 },
            ]}
          >
            <PooCreatureBadge
              size={50}
              {...battle.own.style}
              level={battle.own.stats.level}
            ></PooCreatureBadge>
            <View style={[style.flexRow, { flex: 1, gap: 5 }]}>
              <Text
                lineBreakMode="clip"
                numberOfLines={1}
                style={{ flex: 1, textAlign: "left", fontWeight: "600" }}
              >
                {battle.own.style.name}
              </Text>
              <Text
                lineBreakMode="clip"
                numberOfLines={1}
                style={{ flex: 1, textAlign: "right", fontWeight: "600" }}
              >
                {battle.adv.style.name}
              </Text>
            </View>
            <PooCreatureBadge
              size={50}
              {...battle.adv.style}
              level={battle.adv.stats.level}
            ></PooCreatureBadge>
          </View>
          <View style={[style.flexRow, {}]}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 10,
                gap: 5,
                paddingBottom: 10,
              }}
            >
              <PooCreatureStatsTable
                stats={battle.own.stats}
              ></PooCreatureStatsTable>
              <UltiItem
                ulti={battle.own.stats.ultiSelected ?? undefined}
              ></UltiItem>
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 10,
                gap: 5,
                paddingBottom: 10,
              }}
            >
              <PooCreatureStatsTable
                stats={battle.adv.stats}
              ></PooCreatureStatsTable>
              <UltiItem
                ulti={battle.adv.stats.ultiSelected ?? undefined}
              ></UltiItem>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
