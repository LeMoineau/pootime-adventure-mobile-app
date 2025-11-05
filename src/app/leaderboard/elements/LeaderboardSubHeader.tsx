import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import PooCreatureBadge from "../../../common/components/misc/poo-creature/PooCreatureBadge";
import StandardButton from "../../../common/components/buttons/StandardButton";
import { colors } from "../../../common/utils/color-utils";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import TextWithResourceIcon from "../../../common/components/text/TextWithResourceIcon";
import ResourceIcon from "../../../common/components/icons/ResourceIcon";

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
              <ResourceIcon resource="pooTrophee" size={22}></ResourceIcon>
              <Text
                style={[
                  style.textBold,
                  {
                    fontSize: 15,
                    color: colors.white,
                    textShadowColor: colors.black,
                    textShadowRadius: 3,
                    textShadowOffset: { width: 0, height: 0 },
                  },
                ]}
              >
                100
              </Text>
              <Text
                style={[
                  style.textBold,
                  {
                    position: "relative",
                    left: -5,
                    top: -5,
                    fontSize: 13,
                    color: colors.white,
                    textShadowColor: colors.black,
                    textShadowRadius: 3,
                    textShadowOffset: { width: 0, height: 0 },
                  },
                ]}
              >
                e
              </Text>
              <ResourceIcon resource="pooCoins" size={22}></ResourceIcon>
              <Text
                style={[
                  style.textBold,
                  {
                    fontSize: 15,
                    color: colors.white,
                    textShadowColor: colors.black,
                    textShadowRadius: 3,
                    textShadowOffset: { width: 0, height: 0 },
                  },
                ]}
              >
                26
              </Text>
              <Text
                style={[
                  style.textBold,
                  {
                    position: "relative",
                    left: -5,
                    top: -5,
                    fontSize: 13,
                    color: colors.white,
                    textShadowColor: colors.black,
                    textShadowRadius: 3,
                    textShadowOffset: { width: 0, height: 0 },
                  },
                ]}
              >
                e
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
