import { SafeAreaView, Text, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import PooCreatureManager from "./poo-creature/PooCreatureManager";
import HomeTopBar from "./navigation/HomeTopBar";
import BattleModals from "./elements/BattleModals";

export default function Home() {
  return (
    <SafeAreaView style={[style.wFull, style.hFull]}>
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
