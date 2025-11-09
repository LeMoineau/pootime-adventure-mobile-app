import { View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import InputField from "../../../common/components/fields/InputField";
import NumberField from "../../../common/components/fields/NumberField";
import PooCoinIcon from "../../../common/components/icons/resources/pooCoin";
import PenIcon from "../../../common/components/icons/pen";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import WoolIcon from "../../../common/components/icons/resources/wool";

export default function EditorTopBar() {
  const { width } = useWindowDimensions();
  const { get } = useResourcesStore();
  const { name, update } = usePooCreatureStyleStore();

  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        {
          alignItems: "flex-start",
          width: width,
          position: "absolute",
          top: 20,
          left: 0,
          paddingHorizontal: 20,
        },
      ]}
    >
      <InputField
        style={{ marginRight: 20, flex: 1 }}
        placeholder={"Name"}
        defaultValue={name}
        onChange={async (val) => {
          await update("name", val);
        }}
        appendIcon={<PenIcon size={20}></PenIcon>}
      ></InputField>
      <View>
        <NumberField
          value={get("pooCoins")}
          appendElement={<PooCoinIcon size={40}></PooCoinIcon>}
          useReduceNumberFormat
        ></NumberField>
        <NumberField
          value={get("stars")}
          style={[{ marginTop: 5 }]}
          appendElement={<WoolIcon ratio={0.35}></WoolIcon>}
          useReduceNumberFormat
        ></NumberField>
      </View>
    </View>
  );
}
