import { ScrollView, Text, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import StandardButton from "../../common/components/buttons/StandardButton";
import ExpoIcon from "../../common/components/icons/ExpoIcon";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { useResourcesStore } from "../../common/stores/resources.store";
import ResourceIcon from "../../common/components/icons/ResourceIcon";
import { Resources } from "../../common/config/game-data/Resources";
import { style } from "../../common/utils/style-utils";
import { ResourcesNames } from "../../common/config/game-data/ResourcesNames";

export default function InventoryPage() {
  const navigator: useNavigationType = useNavigation();
  const { inventory, get } = useResourcesStore();

  return (
    <CustomPage bgColor={colors.transparent}>
      <ScrollView
        style={[
          style.border,
          {
            backgroundColor: colors.white,
            marginTop: 60,
            marginHorizontal: 10,
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        ]}
      >
        <Text
          style={[
            {
              fontSize: 17,
              letterSpacing: 1,
              paddingHorizontal: 10,
              paddingTop: 20,
              paddingBottom: 10,
              fontWeight: "500",
            },
          ]}
        >
          Inventory
        </Text>
        <View style={[style.flexCol, { flex: 1, paddingHorizontal: 10 }]}>
          {Object.keys(inventory).map((resource, index) => (
            <View
              key={`inventory-${resource}-${index}`}
              style={[
                style.border,
                style.flexRow,
                style.rounded,
                { backgroundColor: colors.gray[50], marginVertical: 5 },
              ]}
            >
              <View
                style={[
                  style.flexRow,
                  style.justifyCenter,
                  style.itemsCenter,
                  {
                    borderRightColor: colors.gray[200],
                    borderRightWidth: 1,
                    backgroundColor: colors.gray[100],
                    flex: 0,
                    width: 80,
                    height: 80,
                  },
                ]}
              >
                <ResourceIcon
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
                  style={[
                    { fontSize: 17, fontWeight: "500", letterSpacing: 1 },
                  ]}
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
      </ScrollView>
    </CustomPage>
  );
}
