import { View } from "react-native";
import { style } from "../../common/utils/style-utils";
import PooCreatureHandler from "./poo-creature/PooCreatureHandler";
import HomeTopBar from "./navigation/HomeTopBar";
import BattleHandler from "./elements/BattleHandler";
import CustomPage from "../../common/components/navigation/CustomPage";
import SheepJumpHandler from "./elements/SheepJumpHandler";
import EventsModalHandler from "./elements/EventsModalHandler";
import HomeBattleButton from "./elements/buttons/home-battle-button/HomeBattleButton";

export default function Home() {
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
          <PooCreatureHandler></PooCreatureHandler>
          <EventsModalHandler></EventsModalHandler>
        </View>
        <HomeBattleButton></HomeBattleButton>
      </View>
    </CustomPage>
  );
}
