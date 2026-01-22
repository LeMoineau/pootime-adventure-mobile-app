import { View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import InputField from "../../../../components/fields/InputField";
import { usePooCreatureStyleStore } from "../../../../common/stores/poo-creature-style.store";
import ResetStatsButton from "./ResetStatsButton";
import { DefaultValues } from "../../../../common/config/DefaultValues";

export default function StatsTopBar() {
  const { name, update } = usePooCreatureStyleStore();

  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        { marginBottom: 15 },
      ]}
    >
      <InputField
        style={[{ flex: 1 }]}
        textInputStyle={[{ width: "100%", paddingVertical: 10 }]}
        paddingVertical={7}
        paddingHorizontal={20}
        placeholder={"Your Name"}
        onChange={(value) => {
          if (value.length <= 0) {
            update("name", DefaultValues.PooCreatureStyle.name);
            return;
          }
          update("name", value);
        }}
        defaultValue={name}
      ></InputField>
      <View style={[{ width: 10 }]}></View>
      <ResetStatsButton></ResetStatsButton>
    </View>
  );
}
