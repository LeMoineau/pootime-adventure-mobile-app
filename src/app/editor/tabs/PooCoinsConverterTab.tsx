import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import ResourceConverterButton from "../../../common/components/buttons/ResourceConverterButton";

export default function PooCoinsConverterTab() {
  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.flexWrap,
        { padding: 20 },
      ]}
    >
      <ResourceConverterButton
        from="wool"
        to="pooCoins"
        price={250}
        nbGive={100}
      ></ResourceConverterButton>
      <ResourceConverterButton
        from="wool"
        to="pooCoins"
        price={2500}
        nbGive={1000}
      ></ResourceConverterButton>
    </View>
  );
}
