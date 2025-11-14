import { Text, View } from "react-native";
import { style } from "../../../utils/style-utils";

export default function PooCreatureStatsTable() {
  return (
    <View style={[style.flexRow, {}]}>
      <View style={[{ flex: 1 }]}>
        <Text>10</Text>
        <Text>10</Text>
        <Text>10</Text>
      </View>
      <View style={[{ flex: 1 }]}>
        <Text>10</Text>
        <Text>10</Text>
        <Text>10</Text>
      </View>
    </View>
  );
}
