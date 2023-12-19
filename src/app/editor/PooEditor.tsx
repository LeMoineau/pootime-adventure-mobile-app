import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import AnimatedBackground from "../../common/components/misc/AnimatedBackground";
import { style } from "../../common/utils/style-utils";
import NumberField from "../../common/components/fields/NumberField";
import StarIcon from "../../common/components/icons/star";
import PooCoinIcon from "../../common/components/icons/pooCoin";
import PooCreatureButton from "../../common/components/poo-creature/PooCreatureManager";
import { useResourcesStore } from "../../common/stores/resources.store";
import { useShallow } from "zustand/react/shallow";
import InputField from "../../common/components/fields/InputField";
import { usePooCreatureStore } from "../../common/stores/poo-creature.store";
import PenIcon from "../../common/components/icons/pen";
import useStorage from "../../common/hooks/use-storage";
import { StorageKeys } from "../../common/utils/storage-keys";
import EditorTopBar from "../../common/components/navigation/EditorTopBar";
import PooCreature from "../../common/components/misc/PooCreature";
import SmileExpression from "../../common/components/icons/expressions/SmileExpression";
import { colors } from "../../common/utils/color-utils";
import PooBody from "../../common/components/icons/poo/PooBody";
import PooFace from "../../common/components/icons/poo/PooFace";
import PooHead from "../../common/components/icons/poo/PooHead";
import PooBodyEditIcon from "../../common/components/icons/pooBodyEdit";
import PooHeadEditIcon from "../../common/components/icons/pooHeadEdit";
import PooFaceEditIcon from "../../common/components/icons/pooFaceEdit";
import EditorScrollView from "./EditorScrollView";

export default function PooEditor() {
  const { bodyColor } = usePooCreatureStore();
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
          expression={<SmileExpression></SmileExpression>}
          width={150}
        ></PooCreature>
        <EditorScrollView></EditorScrollView>
      </View>
    </SafeAreaView>
  );
}
