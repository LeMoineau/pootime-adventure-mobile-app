import { Image, SafeAreaView, View } from "react-native";
import AnimatedBackground from "../../common/components/misc/AnimatedBackground";
import { style } from "../../common/utils/style-utils";
import PooCreature from "../../common/components/misc/PooCreature";
import FightTopBar from "./navigation/FightTopBar";
import RoundedScrollView from "../../common/components/views/rounded-scroll-view/RoundedScrollView";
import StatsTab from "./tabs/StatsTab";
import StatsIcons from "../../common/components/icons/stats";
import PooUltiIcon from "../../common/components/icons/pooUlti";
import UltiTab from "./tabs/UltiTab";
import IconFromImage from "../../common/components/icons/IconFromImage";
import BattleTab from "./tabs/BattleTab";
import StandardButton from "../../common/components/buttons/StandardButton";

export default function PooFight() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AnimatedBackground
        imageUri="https://bigstones.fr/pootime-adventure/poobg.png"
        bgColor="#FFE5A3"
      ></AnimatedBackground>
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
        <StandardButton>Battle</StandardButton>
        <RoundedScrollView
          defaultTab={2}
          tabs={[
            {
              icon: <StatsIcons size={35}></StatsIcons>,
              content: <StatsTab></StatsTab>,
            },
            {
              icon: <PooUltiIcon size={35}></PooUltiIcon>,
              content: <UltiTab></UltiTab>,
            },
            {
              icon: (
                <IconFromImage uri="https://bigstones.fr/pootime-adventure/poofight.png"></IconFromImage>
              ),
              content: <BattleTab></BattleTab>,
            },
          ]}
        ></RoundedScrollView>
      </View>
    </SafeAreaView>
  );
}
