import { SafeAreaView, Text, View, useWindowDimensions } from "react-native";
import { style } from "../common/utils/style-utils";
import PooCreature from "../common/components/misc/PooCreature";
import SmileExpression from "../common/components/icons/expressions/SmileExpression";
import AnimatedBackground from "../common/components/misc/AnimatedBackground";
import StandardButton from "../common/components/buttons/StandardButton";
import NumberField from "../common/components/fields/NumberField";
import ProgressBar from "../common/components/fields/ProgressBar";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import PooCreatureButton from "../common/components/poo-creature/PooCreatureManager";
import PooCoinIcon from "../common/components/icons/pooCoin";
import StarIcon from "../common/components/icons/star";
import { useResourcesStore } from "../common/stores/resources.store";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const { width, height } = useWindowDimensions();
  const { stars, pooCoins } = useResourcesStore(
    useShallow((state) => ({ stars: state.stars, pooCoins: state.pooCoins }))
  );
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
        <View
          style={[
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            { width: width, position: "absolute", top: 20, left: 0 },
          ]}
        >
          <NumberField
            value={stars}
            appendElement={<StarIcon size={40}></StarIcon>}
            style={{ marginHorizontal: 10 }}
          ></NumberField>
          <NumberField
            value={pooCoins}
            appendElement={<PooCoinIcon size={40}></PooCoinIcon>}
          ></NumberField>
        </View>
        <PooCreatureButton></PooCreatureButton>
      </View>
    </SafeAreaView>
  );
}
