import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import StatsField from "./StatsField";
import StarIcon from "../../../common/components/icons/star";

export default function StatsTab() {
  return (
    <View style={[style.flexRow, style.flexWrap, { padding: 20 }]}>
      <StatsField label="Attaque"></StatsField>
      <StatsField label="Défense"></StatsField>
      <StatsField label="Point de Vie"></StatsField>
      <StatsField label="Mana"></StatsField>
      <StatsField label="Résist. Mana"></StatsField>
      <StatsField label="Récup. Mana"></StatsField>
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
    </View>
  );
}
