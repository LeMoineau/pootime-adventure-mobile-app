import { View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import InputField from "../../../common/components/fields/InputField";
import NumberField from "../../../common/components/fields/NumberField";
import PooCoinIcon from "../../../common/components/icons/pooCoin";
import PenIcon from "../../../common/components/icons/pen";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { useShallow } from "zustand/react/shallow";

export default function EditorTopBar() {
  const { width } = useWindowDimensions();
  const { pooCoins } = useResourcesStore(
    useShallow((state) => ({ stars: state.stars, pooCoins: state.pooCoins }))
  );
  const { name, setName } = usePooCreatureStyleStore();

  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        {
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
      <NumberField
        value={pooCoins}
        appendElement={<PooCoinIcon size={40}></PooCoinIcon>}
      ></NumberField>
    </View>
  );
}
