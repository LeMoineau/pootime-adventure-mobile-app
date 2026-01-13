import { View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { style } from "../../common/utils/style-utils";
import PooCreatureView from "../../features/(tabs)/home/components/HomePooCreature";
import HomeTopBar from "../../features/(tabs)/home/components/HomeTopBar";
import StandardButton from "../../common/components/buttons/StandardButton";
import { colors } from "../../common/utils/color-utils";
import { useRouter } from "expo-router";

export default function HomeTab() {
  const router = useRouter();

  return (
    <CustomPage>
      <View
        style={[
          style.wFull,
          style.hFull,
          style.flexCol,
          style.justifyBetween,
          style.itemsCenter,
          { paddingHorizontal: 20, paddingBottom: 20 },
        ]}
      >
        <HomeTopBar></HomeTopBar>
        <View
          style={[
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            style.wFull,
            { flex: 1 },
          ]}
        >
          <PooCreatureView></PooCreatureView>
        </View>
        <StandardButton
          style={[{ width: "100%" }]}
          viewStyle={[style.border, { borderColor: colors.emerald[600] }]}
          bgColor={colors.emerald[400]}
          textStyle={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.white,
            textTransform: "uppercase",
          }}
          onPress={() => {
            router.push("adventure-zone-selector");
          }}
        >
          Partir à l'aventure
        </StandardButton>
      </View>
    </CustomPage>
  );
}
