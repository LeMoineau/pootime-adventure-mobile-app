import { Text, View } from "react-native";
import { style } from "../../../../utils/style-utils";
import StarIcon from "../../../../components/common/icons/resources/star";

export default function StatsTips() {
  return (
    <View
      style={[
        style.flexRow,
        style.flexWrap,
        style.justifyCenter,
        style.itemsCenter,
        { width: "100%", marginTop: 20 },
      ]}
    >
      <Text style={[style.textBold, style.textSm, style.textCenter]}>
        Tips :{" "}
      </Text>
      <Text style={[style.textSm]}>Vous avez besoin de</Text>
      <Text style={[style.textBold, style.textSm]}> 1 </Text>
      <StarIcon></StarIcon>
      <Text style={[style.textSm]}> pour améliorer une statistique !</Text>
    </View>
  );
}
