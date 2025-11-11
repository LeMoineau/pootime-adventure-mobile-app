import { View } from "react-native";
import { style } from "../../common/utils/style-utils";
import FightTopBar from "./elements/navigation/FightTopBar";
import RoundedScrollView from "../../common/components/views/rounded-scroll-view/RoundedScrollView";
import StatsTab from "./elements/tabs/StatsTab";
import StatsIcons from "../../common/components/icons/stats";
import PooUltiIcon from "../../common/components/icons/pooUlti";
import UltiTab from "./elements/tabs/UltiTab";
import CustomPage from "../../common/components/navigation/CustomPage";

export default function PooStats() {
  return (
    <CustomPage>
      <View
        style={[
          style.wFull,
          style.hFull,
          style.flexCol,
          style.itemsCenter,
          { paddingTop: 10, paddingHorizontal: 10 },
        ]}
      >
        <FightTopBar></FightTopBar>
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
