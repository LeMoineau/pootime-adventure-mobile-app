import { View } from "react-native";
import InputField from "../../../../components/fields/InputField";
import { style } from "../../../../common/utils/style-utils";
import { useVillageStore } from "../../../../common/stores/village.store";
import ExpoIcon from "../../../../components/icons/ExpoIcon";
import { DefaultValues } from "../../../../config/DefaultValues";

export default function VillageTopBar() {
  const { name, change } = useVillageStore();

  return (
    <>
      <View
        style={[
          style.flexRow,
          style.justifyCenter,
          style.itemsCenter,
          { marginBottom: 20 },
        ]}
      >
        <InputField
          defaultValue={name}
          placeholder="Your Village name"
          style={[{ flex: 1, paddingHorizontal: 20 }]}
          textInputStyle={[style.textCenter, {}]}
          paddingVertical={7}
          paddingHorizontal={20}
          onChange={async (val) => {
            if (val.length <= 0) {
              change("name", DefaultValues.Village.name);
              return;
            }
            change("name", val);
          }}
          appendIcon={
            <ExpoIcon
              name="edit"
              size={25}
              style={[{ transform: [{ translateX: -30 }] }]}
            ></ExpoIcon>
          }
        ></InputField>
      </View>
    </>
  );
}
