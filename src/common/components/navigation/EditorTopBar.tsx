import { View, useWindowDimensions } from "react-native";
import { style } from "../../utils/style-utils";
import InputField from "../fields/InputField";
import NumberField from "../fields/NumberField";
import PooCoinIcon from "../icons/pooCoin";
import PenIcon from "../icons/pen";
import { StorageKeys } from "../../utils/storage-keys";
import { useResourcesStore } from "../../stores/resources.store";
import { usePooCreatureStore } from "../../stores/poo-creature.store";
import useStorage from "../../hooks/use-storage";
import { useShallow } from "zustand/react/shallow";

export default function EditorTopBar() {
  const { width } = useWindowDimensions();
  const { pooCoins } = useResourcesStore(
    useShallow((state) => ({ stars: state.stars, pooCoins: state.pooCoins }))
  );
  const { name, setName } = usePooCreatureStore();

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
