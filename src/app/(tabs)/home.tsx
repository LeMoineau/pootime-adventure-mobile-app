import { View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { style } from "../../common/utils/style-utils";
import PooCreatureView from "../../features/home/components/HomePooCreature";
import HomeBattleButton from "../../features/home/components/buttons/HomeBattleButton";
import HomeTopBar from "../../features/home/components/HomeTopBar";

export default function HomeTab() {
  return (
    <CustomPage>
      <View
        style={[
          style.wFull,
          style.hFull,
          style.flexCol,
          style.justifyBetween,
          style.itemsCenter,
          { paddingHorizontal: 20 },
        ]}
      >
        <HomeTopBar></HomeTopBar>
        <View
          style={[
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            style.wFull,
            { flex: 1 },
          ]}
        >
          <PooCreatureView></PooCreatureView>
        </View>
        <HomeBattleButton></HomeBattleButton>
      </View>
    </CustomPage>
  );
}
