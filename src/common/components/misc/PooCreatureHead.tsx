import { View } from "react-native";
import PooCreature from "./PooCreature";
import { style } from "../../utils/style-utils";

export default function PooCreatureHead({ size }: { size?: number }) {
  return (
    <View style={[style.overflowHidden, { width: size, height: size }]}>
      <PooCreature width={size} onlyHead></PooCreature>
    </View>
  );
}
