import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import StarIcon from "../../../common/components/icons/star";

export default function StatsTips() {
  return (
    <View
      style={[
        style.flexRow,
        style.flexWrap,
        style.justifyCenter,
        style.itemsCenter,
        { width: "100%" },
      ]}
    >
      <Text
        style={[
          style.textBold,
          style.textMd,
          style.textCenter,
          { width: "100%", marginTop: 10 },
        ]}
      >
        Tips :
      </Text>
      <Text style={[style.textMd]}>Vous avez besoin de</Text>
      <Text style={[style.textBold, style.textMd]}> 1 </Text>
      <StarIcon></StarIcon>
      <Text style={[style.textMd]}> pour améliorer une statistique !</Text>
    </View>
  );
}
