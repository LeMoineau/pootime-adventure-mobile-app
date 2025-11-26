import { View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeProfileButton from "./buttons/HomeProfileButton";
import { style } from "../../../common/utils/style-utils";
import StandardButton from "../../../common/components/buttons/StandardButton";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import { useRouter } from "expo-router";

export default function HomeTopBar() {
  const { width } = useWindowDimensions();
  const router = useRouter();

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
        <HomeProfileButton
          onPress={() => router.push("/leaderboard")}
        ></HomeProfileButton>
        <StandardButton
          viewStyle={[
            style.border,
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            { width: 70, flex: 1, marginHorizontal: 5, padding: 0 },
          ]}
          onPress={() => router.push("/inventory")}
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
            router.push("/settings");
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
