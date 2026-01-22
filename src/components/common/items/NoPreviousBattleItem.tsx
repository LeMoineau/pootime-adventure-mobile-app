import { Text, View } from "react-native";
import ExpoIcon from "../icons/ExpoIcon";
import { style } from "../../../utils/style-utils";

export default function NoPreviousBattleItem() {
  return (
    <View style={[style.flexRow, { flex: 1, gap: 20, paddingHorizontal: 10 }]}>
      <ExpoIcon name="group-off" size={30}></ExpoIcon>
      <View style={[style.flexCol, { flex: 1, gap: 5 }]}>
        <Text style={[{ fontWeight: "500", fontSize: 15 }]}>
          Vous n'avez pas encore combattu !
        </Text>
        <Text style={[{ fontSize: 12, opacity: 0.8 }]}>
          Ici s'afficheront toutes vos dernières batailles, alors allez-y,
          lancez votre première bataille !
        </Text>
      </View>
    </View>
  );
}
