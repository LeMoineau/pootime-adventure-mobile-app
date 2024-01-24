import { View } from "react-native";
import { style } from "../../common/utils/style-utils";
import PooCreatureHandler from "./poo-creature/PooCreatureHandler";
import HomeTopBar from "./navigation/HomeTopBar";
import BattleHandler from "./elements/BattleHandler";
import CustomPage from "../../common/components/navigation/CustomPage";
import SheepJumpHandler from "./elements/SheepJumpHandler";
import EventsModalHandler from "./elements/EventsModalHandler";
import { useResourcesStore } from "../../common/stores/resources.store";
import { useEffect } from "react";

export default function Home() {
  const { earn } = useResourcesStore();
  useEffect(() => {
    earn("wool", 99999);
  }, []);
  return (
    <CustomPage>
      <View
        style={[
          style.wFull,
          style.hFull,
          style.flexCol,
          style.justifyBetween,
          style.itemsCenter,
          { paddingHorizontal: 20, paddingVertical: 10 },
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
          <BattleHandler></BattleHandler>
          <SheepJumpHandler></SheepJumpHandler>
          <EventsModalHandler></EventsModalHandler>
        </View>
      </View>
    </CustomPage>
  );
}
