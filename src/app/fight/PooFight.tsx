import { Button, RefreshControl, ScrollView, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { style } from "../../common/utils/style-utils";
import PooCreatureRankSubHeader from "../../common/components/misc/poo-creature/PooCreatureRankSubHeader";
import StandardButton from "../../common/components/buttons/StandardButton";
import { colors } from "../../common/utils/color-utils";
import TitleWithDivider from "../../common/components/text/TitleWithDivider";
import PreviousBattleItem from "../../common/components/items/PreviousBattleItem";
import ExpoIcon from "../../common/components/icons/ExpoIcon";
import { LinearGradient } from "expo-linear-gradient";

export default function PooFight() {
  return (
    <CustomPage>
      <ScrollView
        style={[
          style.wFull,
          style.flexCol,
          { flex: 1, backgroundColor: colors.white },
        ]}
      >
        <View
          style={{
            paddingTop: 10,
            backgroundColor: colors.baseBackgroundColor,
          }}
        >
          <PooCreatureRankSubHeader></PooCreatureRankSubHeader>
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
          <TitleWithDivider viewStyle={{ marginBottom: 10 }}>
            Previous Battles
          </TitleWithDivider>
          <PreviousBattleItem></PreviousBattleItem>
        </View>
      </ScrollView>
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          {
            position: "absolute",
            bottom: 20,
            gap: 10,
            paddingHorizontal: 20,
            zIndex: 10,
          },
        ]}
      >
        {/* TODO: ajouter linear-gradient */}
        <StandardButton
          style={[{ flex: 1 }]}
          viewStyle={[style.border, { borderColor: colors.indigo[600] }]}
          bgColor={colors.indigo[400]}
          textStyle={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.white,
          }}
        >
          FIGHT ONLINE
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
