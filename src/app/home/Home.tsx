import { View } from "react-native";
import { style } from "../../common/utils/style-utils";
import PooCreatureHandler from "./poo-creature/PooCreatureHandler";
import HomeTopBar from "./navigation/HomeTopBar";
import CustomPage from "../../common/components/navigation/CustomPage";
import EventsModalHandler from "./elements/EventsModalHandler";
import HomeBattleButton from "./elements/buttons/home-battle-button/HomeBattleButton";
import ToiletIcon from "../../common/components/icons/village/toilet/Toilet";

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
