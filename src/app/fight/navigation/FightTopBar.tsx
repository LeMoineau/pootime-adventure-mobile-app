import { View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import NumberField from "../../../common/components/fields/NumberField";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { useShallow } from "zustand/react/shallow";
import StarIcon from "../../../common/components/icons/star";
import ProgressBar from "../../../common/components/fields/ProgressBar";
import LevelProgressBar from "../../../common/components/fields/LevelProgressBar";
import InputField from "../../../common/components/fields/InputField";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import ResetStatsButton from "../elements/ResetStatsButton";
import { DefaultValues } from "../../../common/config/DefaultValues";

export default function FightTopBar() {
  const { width } = useWindowDimensions();
  const { get } = useResourcesStore();
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
