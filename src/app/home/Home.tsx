import { View } from "react-native";
import { style } from "../../common/utils/style-utils";
import HomeTopBar from "./elements/navigation/HomeTopBar";
import CustomPage from "../../common/components/navigation/CustomPage";
import EventsModalHandler from "./elements/EventsModalHandler";
import HomeBattleButton from "./elements/buttons/home-battle-button/HomeBattleButton";
import PooCreatureView from "./elements/PooCreatureView";

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
          <PooCreatureView></PooCreatureView>
          {/* <EventsModalHandler></EventsModalHandler> */}
        </View>
        <HomeBattleButton></HomeBattleButton>
      </View>
    </CustomPage>
  );
}
