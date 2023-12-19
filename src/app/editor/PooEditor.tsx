import { SafeAreaView, View } from "react-native";
import AnimatedBackground from "../../common/components/misc/AnimatedBackground";
import { style } from "../../common/utils/style-utils";
import { usePooCreatureStore } from "../../common/stores/poo-creature.store";
import EditorTopBar from "../../common/components/navigation/EditorTopBar";
import PooCreature from "../../common/components/misc/PooCreature";
import EditorScrollView from "./EditorScrollView";

export default function PooEditor() {
  const { bodyColor, expression } = usePooCreatureStore();
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
          style.itemsCenter,
          { paddingTop: 80 },
        ]}
      >
        <EditorTopBar></EditorTopBar>
        <PooCreature
          bodyColor={bodyColor}
          expression={expression}
          width={150}
        ></PooCreature>
        <EditorScrollView></EditorScrollView>
      </View>
    </SafeAreaView>
  );
}
