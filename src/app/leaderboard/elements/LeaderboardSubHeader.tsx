import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import PooCreatureBadge from "../../../common/components/misc/poo-creature/PooCreatureBadge";
import { colors } from "../../../common/utils/color-utils";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { Resources } from "../../../common/config/constants/Resources";
import ResourceRank from "../../../common/components/text/ResourceRank";

const RESOURCE_LEADERBOARDED: Resources[] = ["pooTrophee", "pooCoins"];

export default function LeaderboardSubHeader() {
  const { name } = usePooCreatureStyleStore();

  return (
    <>
      <View style={[{ paddingVertical: 20, width: "100%" }]}>
        <View style={[style.flexRow, style.justifyCenter, { gap: 10 }]}>
          <PooCreatureBadge
            size={100}
            useBodyColorForBackground
          ></PooCreatureBadge>
          <View style={[style.flexCol, style.justifyCenter, { flex: 0 }]}>
            <Text
              style={[
                style.textLg,
                style.textBold,
                {
                  color: colors.white,
                  textShadowColor: colors.black,
                  textShadowRadius: 3,
                  textShadowOffset: { width: 0, height: 1 },
                },
              ]}
            >
              {name}
            </Text>
            <View style={[style.flexRow, { gap: 5 }]}>
              {RESOURCE_LEADERBOARDED.map((r, index) => (
                <ResourceRank resource={r} key={index}></ResourceRank>
              ))}
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
