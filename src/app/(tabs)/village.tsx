import { View } from "react-native";
import CustomPage from "../../components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import { Structures } from "../../common/config/constants/Structures";
import { style } from "../../common/utils/style-utils";
import { useRouter } from "expo-router";
import VillageTopBar from "../../features/(tabs)/village/components/VillageTopBar";
import StructureView from "../../features/(tabs)/village/components/StructureView";

export default function VillageTab() {
  const router = useRouter();

  //TODO: init structures (set current level)

  return (
    <CustomPage
      bgColor={colors.baseBackgroundColor}
      style={[
        style.flexCol,
        style.justifyCenter,
        style.itemsCenter,
        { padding: 10 },
      ]}
    >
      <VillageTopBar></VillageTopBar>
      <View
        style={[
          style.wFull,
          {
            flex: 1,
            backgroundColor: colors.villageDirt,
            height: 50,
            paddingBottom: 50,
            borderRadius: 20,
            marginTop: 20,
            marginBottom: 5,
          },
        ]}
      >
        <View
          style={[
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            style.rounded,
            {
              flex: 1,
              flexWrap: "wrap",
              paddingTop: 0,
              backgroundColor: colors.villageGrass,
              borderRadius: 20,
            },
          ]}
        >
          {Object.entries(Structures).map(([name, structure], index) => {
            return (
              <StructureView
                key={`structure-${name}-${index}`}
                structure={structure}
                onStructurePress={() =>
                  router.push({
                    pathname: "village/[structureName]",
                    params: { structureName: name },
                  })
                }
              ></StructureView>
            );
          })}
        </View>
      </View>
    </CustomPage>
  );
}
