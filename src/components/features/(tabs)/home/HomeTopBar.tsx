import { View, useWindowDimensions } from "react-native";
import HomeProfileButton from "./HomeProfileButton";
import { style } from "../../../../utils/style-utils";
import StandardButton from "../../../common/buttons/StandardButton";
import ExpoIcon from "../../../common/icons/ExpoIcon";
import { useRouter } from "expo-router";
import { useAuthentication } from "../../../../hooks/common/firebase/use-authentification";

export default function HomeTopBar() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { user } = useAuthentication();

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
          onPress={() => {
            router.push({
              pathname: "/player/[uid]",
              params: { uid: "yourself", yourself: "true" },
            });
          }}
        ></HomeProfileButton>
        <StandardButton
          viewStyle={[
            style.border,
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            { width: 70, flex: 1, marginHorizontal: 5, padding: 0 },
          ]}
          onPress={() => router.push("/leaderboard")}
        >
          <ExpoIcon
            style={[{ width: 30, height: 30 }]}
            name="trophy-outline"
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
