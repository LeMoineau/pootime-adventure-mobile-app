import { Text, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import StandardButton from "../../common/components/buttons/StandardButton";
import ExpoIcon from "../../common/components/icons/ExpoIcon";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { useResourcesStore } from "../../common/stores/resources.store";
import ResourceIcon from "../../common/components/icons/ResourceIcon";
import { Resources } from "../../common/types/Resources";
import { style } from "../../common/utils/style-utils";
import { ResourcesNames } from "../../common/config/game-data/ResourcesNames";

export default function InventoryPage() {
  const navigator: useNavigationType = useNavigation();
  const { inventory, get } = useResourcesStore();

  return (
    <CustomPage bgColor={colors.orange[200]}>
      <View style={[{ padding: 10 }]}>
        <StandardButton
          prependIcon={<ExpoIcon name="arrow-back" size={20}></ExpoIcon>}
          appendIcon={
            <ExpoIcon
              name="arrow-back"
              size={20}
              style={[{ opacity: 0 }]}
            ></ExpoIcon>
          }
          onPress={() => navigator.goBack()}
          disablePressingAnimation
          bgColor={colors.orange[300]}
          textColor={colors.orange[200]}
          textStyle={[{ fontWeight: "600", letterSpacing: 1 }]}
        >
          Inventory
        </StandardButton>
      </View>
      <View style={[style.flexCol, { flex: 1, paddingHorizontal: 10 }]}>
        {Object.keys(inventory).map((resource, index) => (
          <View
            style={[
              style.border,
              style.flexRow,
              style.rounded,
              { backgroundColor: colors.gray[50], marginVertical: 5 },
            ]}
          >
            <View
              style={[
                {
                  padding: 15,
                  borderRightColor: colors.gray[200],
                  borderRightWidth: 1,
                  backgroundColor: colors.gray[100],
                  flex: 0,
                },
              ]}
            >
              <ResourceIcon
                key={`inventory-${resource}-${index}`}
                resource={resource as Resources}
                size={50}
              ></ResourceIcon>
            </View>
            <View
              style={[
                style.flexRow,
                style.justifyBetween,
                style.itemsCenter,
                { flex: 1, paddingHorizontal: 20 },
              ]}
            >
              <Text
                style={[{ fontSize: 17, fontWeight: "500", letterSpacing: 1 }]}
              >
                {ResourcesNames[resource as Resources]}
              </Text>
              <Text style={[style.textBold, style.textMd]}>
                {get(resource as Resources)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </CustomPage>
  );
}
