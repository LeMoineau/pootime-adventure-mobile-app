import { View } from "react-native";
import { style } from "../../utils/style-utils";
import StatsTopBar from "../../features/(tabs)/stats/components/StatsTopBar";
import RoundedScrollView from "../../components/common/views/rounded-scroll-view/RoundedScrollView";
import StatsIcons from "../../components/common/icons/stats";
import PooUltiIcon from "../../components/common/icons/pooUlti";
import UltiTab from "../../features/(tabs)/stats/components/tabs/UltiTab";
import CustomPage from "../../components/common/navigation/CustomPage";
import StatsManager from "../../features/(tabs)/stats/components/tabs/StatsManager";

export default function StatsTab() {
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
        <StatsTopBar></StatsTopBar>
        <RoundedScrollView
          defaultTab={0}
          tabs={[
            {
              icon: <StatsIcons size={35}></StatsIcons>,
              content: <StatsManager></StatsManager>,
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
