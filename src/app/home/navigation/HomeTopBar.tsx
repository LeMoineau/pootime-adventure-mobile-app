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
import GradientButton from "../../../common/components/buttons/GradientButton";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../common/types/NavigationTypes";
import PooCreatureHead from "../../../common/components/misc/poo-creature/PooCreatureHead";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";

export default function HomeTopBar() {
  const { width } = useWindowDimensions();
  const { name } = usePooCreatureStyleStore();
  const { level } = usePooCreatureStatsStore();
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
          },
        ]}
      >
        <GradientButton colors={[colors.gray[300], colors.gray[100]]}>
          <View
            style={[
              style.flexRow,
              style.justifyBetween,
              { flex: 1, paddingHorizontal: 15 },
            ]}
          >
            <View
              style={[style.flexRow, style.justifyCenter, style.itemsCenter]}
            >
              <PooCreatureHead size={45}></PooCreatureHead>
              <View>
                <Text
                  style={[style.textBold, { marginLeft: 10, fontSize: 15 }]}
                >
                  {name}
                </Text>
                <Text
                  style={[
                    { color: colors.gray[500], marginLeft: 10, fontSize: 12 },
                  ]}
                >
                  Level {level}
                </Text>
              </View>
            </View>
          </View>
        </GradientButton>
        <GradientButton
          colors={[colors.gray[300], colors.gray[100]]}
          viewStyle={[{ width: 70, flex: 0, marginHorizontal: 5 }]}
        ></GradientButton>
        <GradientButton
          colors={[colors.gray[300], colors.gray[100]]}
          viewStyle={[{ width: 70, flex: 0 }]}
          onClick={() => {
            navigator.navigate("Inventory");
          }}
        ></GradientButton>
      </View>
    </>
  );
}
