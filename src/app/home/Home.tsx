import { Text, useWindowDimensions, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import PooCreatureHandler from "./poo-creature/PooCreatureHandler";
import HomeTopBar from "./navigation/HomeTopBar";
import BattleHandler from "./elements/BattleHandler";
import CustomPage from "../../common/components/navigation/CustomPage";
import SheepJumpHandler from "./elements/SheepJumpHandler";
import EventsModalHandler from "./elements/EventsModalHandler";
import DialogBubble from "../../common/components/views/DialogBubble";
import DialogBubbleModal from "../../common/components/modals/primitives/DialogBubbleModal";
import useModals from "../../common/hooks/use-modals";
import GradientButton from "../../common/components/buttons/GradientButton";
import { useBlurStore } from "../../common/stores/blur.store";
import ButtonWithDialogBubble from "../../common/components/buttons/ButtonWithDialogBubble";
import PillButton from "../../common/components/buttons/PillButton";
import { colors } from "../../common/utils/color-utils";
import { LinearGradient } from "expo-linear-gradient";
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
          <BattleHandler></BattleHandler>
          <SheepJumpHandler></SheepJumpHandler>
          <EventsModalHandler></EventsModalHandler>
        </View>
        <HomeBattleButton></HomeBattleButton>
      </View>
    </CustomPage>
  );
}
