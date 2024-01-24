import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import ResourceConverterButton from "../../../common/components/buttons/ResourceConverterButton";

export default function PooCoinsConverterTab() {
  return (
    <View style={[style.flexRow, style.flexWrap, { padding: 20 }]}>
      <ResourceConverterButton
        from="wool"
        to="pooCoins"
        price={250}
        nbGive={100}
      ></ResourceConverterButton>
    </View>
  );
}
