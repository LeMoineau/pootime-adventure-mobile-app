import { Image, SafeAreaView, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import PooCreature from "../../common/components/misc/PooCreature";
import FightTopBar from "./navigation/FightTopBar";
import RoundedScrollView from "../../common/components/views/rounded-scroll-view/RoundedScrollView";
import StatsTab from "./tabs/StatsTab";
import StatsIcons from "../../common/components/icons/stats";
import PooUltiIcon from "../../common/components/icons/pooUlti";
import UltiTab from "./tabs/UltiTab";
import CustomPage from "../../common/components/navigation/CustomPage";

export default function PooFight() {
  return (
    <CustomPage>
      <View
        style={[
          style.wFull,
          style.hFull,
          style.flexCol,
          style.itemsCenter,
          { paddingTop: 80 },
        ]}
      >
        <FightTopBar></FightTopBar>
        <PooCreature width={150}></PooCreature>
        <RoundedScrollView
          defaultTab={0}
          tabs={[
            {
              icon: <StatsIcons size={35}></StatsIcons>,
              content: <StatsTab></StatsTab>,
            },
            {
              icon: <PooUltiIcon size={35}></PooUltiIcon>,
              content: <UltiTab></UltiTab>,
            },
          ]}
        ></RoundedScrollView>
      </View>
    </CustomPage>
  );
}
