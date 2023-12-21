import { SafeAreaView, Text, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import AnimatedBackground from "../../common/components/misc/AnimatedBackground";
import PooCreatureManager from "./poo-creature/PooCreatureManager";
import HomeTopBar from "./HomeTopBar";
import { colors } from "../../common/utils/color-utils";
import FightButton from "./elements/FightButton";
import { useState } from "react";
import PrivateFightModal from "../../common/components/modals/PrivateFightModal";
import { useBattleStore } from "../../common/stores/battle.store";

export default function Home() {
  const [showPrivateModal, setShowPrivateModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);

  const { socket, connect, disconnect } = useBattleStore();

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
        <View style={[style.flexRow]}>
          <FightButton
            textContent="Battle!"
            color={colors.yellow}
            onPress={() => {}}
          ></FightButton>
          <View style={{ width: 10 }}></View>
          <FightButton
            textContent="Private"
            color={colors.blue}
            onPress={() => {
              connect();
              setShowPrivateModal(true);
            }}
          ></FightButton>
        </View>
      </View>
      <PrivateFightModal
        visible={showPrivateModal}
        onRequestClose={() => {
          disconnect();
          setShowPrivateModal(false);
        }}
      ></PrivateFightModal>
    </SafeAreaView>
  );
}
