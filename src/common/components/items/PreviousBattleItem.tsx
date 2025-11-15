import { Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";
import PooCreatureBadge from "../misc/poo-creature/PooCreatureBadge";
import PooCreatureStatsTable from "../misc/poo-creature/PooCreatureStatsTable";
import { PooCreatureStats } from "../../types/PooCreatureStats";
import { PooCreatureStyle } from "../../types/PooCreatureStyle";
import { Ultis } from "../../types/Ultis";
import { Image } from "expo-image";
import assets from "../../config/assets";
import UltiItem from "./UltiItem";

export default function PreviousBattleItem({
  players,
}: {
  players: [
    { stats: PooCreatureStats; style: PooCreatureStyle },
    { stats: PooCreatureStats; style: PooCreatureStyle }
  ];
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
              {...players[0].style}
            ></PooCreatureBadge>
            <View style={[style.flexRow, { flex: 1, gap: 5 }]}>
              <Text
                lineBreakMode="clip"
                numberOfLines={1}
                style={{ flex: 1, textAlign: "left", fontWeight: "600" }}
              >
                {players[0].style.name}
              </Text>
              <Text
                lineBreakMode="clip"
                numberOfLines={1}
                style={{ flex: 1, textAlign: "right", fontWeight: "600" }}
              >
                {players[1].style.name}
              </Text>
            </View>
            <PooCreatureBadge
              size={50}
              {...players[1].style}
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
                stats={players[0].stats}
              ></PooCreatureStatsTable>
              <UltiItem
                ulti={players[1].stats.ultiSelected ?? undefined}
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
                stats={players[1].stats}
              ></PooCreatureStatsTable>
              <UltiItem
                ulti={players[1].stats.ultiSelected ?? undefined}
              ></UltiItem>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
