import {
  Button,
  RefreshControl,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { style } from "../../common/utils/style-utils";
import PooCreatureRankSubHeader from "../../common/components/misc/poo-creature/sub-headers/PooCreatureRankSubHeader";
import StandardButton from "../../common/components/buttons/StandardButton";
import { colors } from "../../common/utils/color-utils";
import TitleWithDivider from "../../common/components/text/TitleWithDivider";
import PreviousBattleItem from "../../common/components/items/PreviousBattleItem";
import ExpoIcon from "../../common/components/icons/ExpoIcon";
import Gradient, {
  GradientDirection,
} from "../../common/components/misc/Gradient";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import usePreviousBattles from "../../common/hooks/battle/use-previous-battles";
import NoPreviousBattleItem from "../../common/components/items/NoPreviousBattleItem";
import PooCreatureTropheeSubHeader from "../../common/components/misc/poo-creature/sub-headers/PooCreatureTropheeSubHeader";

export default function PooFight() {
  const { width } = useWindowDimensions();
  const stats = usePooCreatureStatsStore();
  const pooStyle = usePooCreatureStyleStore();
  const { previousBattles } = usePreviousBattles();

  return (
    <CustomPage>
      <ScrollView
        style={[
          style.wFull,
          style.flexCol,
          {
            flex: 1,
            backgroundColor: colors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        ]}
      >
        <View
          style={{
            paddingTop: 10,
            backgroundColor: colors.baseBackgroundColor,
          }}
        >
          <PooCreatureTropheeSubHeader></PooCreatureTropheeSubHeader>
          <View
            style={{
              backgroundColor: colors.white,
              height: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 10,
            }}
          ></View>
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 15,
            paddingRight: 20,
            gap: 10,
          }}
        >
          <TitleWithDivider
            viewStyle={{ marginBottom: 10 }}
            textStyle={{ fontWeight: "500" }}
          >
            Dernière battailles
          </TitleWithDivider>
          {previousBattles.length > 0 ? (
            previousBattles.map((b) => (
              <PreviousBattleItem
                players={[
                  { stats: { ...stats }, style: { ...pooStyle } },
                  { stats: { ...stats }, style: { ...pooStyle } },
                ]}
              ></PreviousBattleItem>
            ))
          ) : (
            <NoPreviousBattleItem></NoPreviousBattleItem>
          )}
          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          {
            position: "absolute",
            bottom: 0,
            gap: 10,
            paddingHorizontal: 20,
            zIndex: 10,
            paddingBottom: 20,
          },
        ]}
      >
        {/* TODO: ajouter linear-gradient */}
        <Gradient
          direction={GradientDirection.BOTTOM_TO_TOP}
          from={colors.gray[800]}
          style={[
            {
              position: "absolute",
              width,
              height: "250%",
              bottom: -50,
              opacity: 0.7,
              pointerEvents: "none",
            },
          ]}
        ></Gradient>
        <StandardButton
          style={[{ flex: 1 }]}
          viewStyle={[style.border, { borderColor: colors.indigo[600] }]}
          bgColor={colors.indigo[400]}
          textStyle={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.white,
            textTransform: "uppercase",
          }}
        >
          Combattre en ligne
        </StandardButton>
        <StandardButton
          style={[{ flex: 0 }]}
          viewStyle={[style.border, { borderColor: colors.amber[600] }]}
          bgColor={colors.amber[400]}
          textStyle={{ fontSize: 16 }}
        >
          <ExpoIcon
            name="lock-outline"
            size={23}
            style={{ color: colors.white }}
          ></ExpoIcon>
        </StandardButton>
      </View>
    </CustomPage>
  );
}
