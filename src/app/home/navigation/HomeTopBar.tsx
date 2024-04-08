import { Text, View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import NumberField from "../../../common/components/fields/NumberField";
import StarIcon from "../../../common/components/icons/star";
import PooCoinIcon from "../../../common/components/icons/pooCoin";
import { useResourcesStore } from "../../../common/stores/resources.store";
import PillButton from "../../../common/components/buttons/PillButton";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../common/utils/color-utils";
import useModals from "../../../common/hooks/use-modals";
import SettingsModal from "../../../common/components/modals/settings/SettingsModal";
import LevelProgressBar from "../../../common/components/fields/LevelProgressBar";
import StandardButton from "../../../common/components/buttons/StandardButton";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../common/types/NavigationTypes";
import PooCreatureHead from "../../../common/components/misc/poo-creature/PooCreatureHead";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";
import HomeProfileButton from "../elements/HomeProfileButton";

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
          bgColor={colors.white}
          borderColor={colors.gray[50]}
          viewStyle={[
            style.border,
            { width: 70, flex: 1, marginHorizontal: 5 },
          ]}
        ></StandardButton>
        <StandardButton
          bgColor={colors.white}
          borderColor={colors.gray[50]}
          viewStyle={[style.border, { width: 70, flex: 1 }]}
          onPress={() => {
            navigator.navigate("Inventory");
          }}
        ></StandardButton>
      </View>
    </>
  );
}
