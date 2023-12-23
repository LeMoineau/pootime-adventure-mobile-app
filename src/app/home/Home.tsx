import { SafeAreaView, Text, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import AnimatedBackground from "../../common/components/misc/AnimatedBackground";
import PooCreatureManager from "./poo-creature/PooCreatureManager";
import HomeTopBar from "./navigation/HomeTopBar";
import BattleModals from "./elements/BattleModals";

export default function Home() {
  return (
    <SafeAreaView style={[style.wFull, style.hFull]}>
      <AnimatedBackground
        imageUri="https://bigstones.fr/pootime-adventure/poobg.png"
        bgColor="#FFE5A3"
      ></AnimatedBackground>
      <View
        style={[
          style.wFull,
          style.hFull,
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { padding: 20 },
        ]}
      >
        <HomeTopBar></HomeTopBar>
        <PooCreatureManager></PooCreatureManager>
        <BattleModals></BattleModals>
      </View>
    </SafeAreaView>
  );
}
