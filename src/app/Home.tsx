import { SafeAreaView, Text, View } from "react-native";
import { style } from "../common/services/style-utils";
import PooCreature from "../common/components/misc/PooCreature";
import SmileExpression from "../common/components/icons/expressions/SmileExpression";
import AnimatedBackground from "../common/components/misc/AnimatedBackground";
import StandardButton from "../common/components/buttons/StandardButton";

export default function Home() {
  return (
    <SafeAreaView style={[style.wFull, style.hFull]}>
      <AnimatedBackground
        imageSrc={require("./../../assets/poobg.svg")}
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
        <PooCreature
          width={(document.body.clientWidth * 1.7) / 3}
          bodyColor="#e5e3b3"
          expression={<SmileExpression></SmileExpression>}
        ></PooCreature>
        <View
          style={[
            style.wFull,
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            { position: "absolute", bottom: 50, left: 0 },
          ]}
        >
          <StandardButton onPress={() => console.log("coucou")}>
            coucou
          </StandardButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
