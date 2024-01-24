import { View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import InputField from "../../../common/components/fields/InputField";
import NumberField from "../../../common/components/fields/NumberField";
import PooCoinIcon from "../../../common/components/icons/pooCoin";
import PenIcon from "../../../common/components/icons/pen";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { useShallow } from "zustand/react/shallow";
import WoolIcon from "../../../common/components/icons/sheep/wool";

export default function EditorTopBar() {
  const { width } = useWindowDimensions();
  const { pooCoins, wool } = useResourcesStore();
  const { name, setName } = usePooCreatureStyleStore();

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
          setName(val);
        }}
        appendIcon={<PenIcon size={20}></PenIcon>}
      ></InputField>
      <View>
        <NumberField
          value={pooCoins}
          appendElement={<PooCoinIcon size={40}></PooCoinIcon>}
        ></NumberField>
        <NumberField
          value={wool}
          style={[{ marginTop: 5 }]}
          appendElement={<WoolIcon ratio={0.35}></WoolIcon>}
        ></NumberField>
      </View>
    </View>
  );
}
