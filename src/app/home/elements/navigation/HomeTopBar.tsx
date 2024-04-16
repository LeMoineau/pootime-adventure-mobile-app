import { View, useWindowDimensions } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import StandardButton from "../../../../common/components/buttons/StandardButton";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../../common/types/navigation/NavigationTypes";
import HomeProfileButton from "../buttons/HomeProfileButton";
import ExpoIcon from "../../../../common/components/icons/ExpoIcon";

export default function HomeTopBar() {
  const { width } = useWindowDimensions();
  const navigator: useNavigationType = useNavigation();

  return (
    <>
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          style.justifyCenter,
          {
            justifyContent: "space-around",
            width: width,
            paddingHorizontal: 10,
            height: 70,
          },
        ]}
      >
        <HomeProfileButton></HomeProfileButton>
        <StandardButton
          viewStyle={[
            style.border,
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            { width: 70, flex: 1, marginHorizontal: 5, padding: 0 },
          ]}
          onPress={() => navigator.navigate("Inventory")}
        >
          <ExpoIcon
            style={[{ width: 30, height: 30 }]}
            name="inventory"
            size={30}
          ></ExpoIcon>
        </StandardButton>
        <StandardButton
          viewStyle={[
            style.border,
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            { width: 70, flex: 1 },
          ]}
          onPress={() => {
            navigator.navigate("Settings");
          }}
        >
          <ExpoIcon
            style={[{ width: 30, height: 30 }]}
            name="settings-outline"
            size={30}
          ></ExpoIcon>
        </StandardButton>
      </View>
    </>
  );
}
