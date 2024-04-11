import { View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import {
  StructureName,
  Structures,
} from "../../common/config/game-data/Structures";
import StructureView from "./elements/StructureView";
import { style } from "../../common/utils/style-utils";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import VillageTopBar from "./elements/navigation/VillageTopBar";

export default function VillagePage() {
  const navigator: useNavigationType = useNavigation();

  return (
    <>
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
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            style.rounded,
            {
              flex: 1,
              flexWrap: "wrap",
              paddingTop: 50,
            },
          ]}
        >
          {Object.keys(Structures).map((key, index) => {
            const structureName = key as StructureName;
            const structure = Structures[structureName];
            return (
              <StructureView
                key={`structure-${key}-${index}`}
                structure={structure}
                onStructurePress={() =>
                  navigator.navigate("StructureInfos", { structureName })
                }
              ></StructureView>
            );
          })}
        </View>
      </CustomPage>
    </>
  );
}
