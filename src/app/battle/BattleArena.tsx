import { View } from "react-native";
import { style } from "../../common/utils/style-utils";
import { colors } from "../../common/utils/color-utils";
import AnimatedBackground from "../../common/components/misc/AnimatedBackground";
import PooCreature from "../../common/components/misc/PooCreature";
import { Room } from "../../common/types/Room";
import PVPanel from "./elements/PVPanel";

export default function BattleArena({ room }: { room: Room }) {
  return (
    <View
      style={[
        style.justifyCenter,
        style.itemsCenter,
        { flex: 1, padding: 20, backgroundColor: colors.white },
      ]}
    >
      <AnimatedBackground
        imageUri="https://bigstones.fr/pootime-adventure/poofight.png"
        bgColor={colors.blue[500]}
      ></AnimatedBackground>
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          style.wFull,
          {
            justifyContent: "space-between",
            position: "absolute",
            top: 30,
            left: 0,
          },
        ]}
      >
        <PVPanel></PVPanel>
        <PVPanel right></PVPanel>
      </View>
      <View
        style={[
          {
            position: "absolute",
            bottom: "50%",
            right: 30,
            marginBottom: 20,
          },
        ]}
      >
        <PooCreature width={180}></PooCreature>
      </View>
      <View
        style={[{ position: "absolute", top: "50%", left: 30, marginTop: 20 }]}
      >
        <PooCreature behind width={230}></PooCreature>
      </View>
    </View>
  );
}
