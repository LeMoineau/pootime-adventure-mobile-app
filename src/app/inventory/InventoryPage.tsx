import { Pressable, ScrollView, Text, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import ExpoIcon from "../../common/components/icons/ExpoIcon";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { useResourcesStore } from "../../common/stores/resources.store";
import ResourceIcon from "../../common/components/icons/ResourceIcon";
import { Resources } from "../../common/config/game-data/Resources";
import { style } from "../../common/utils/style-utils";
import { MathUtils } from "../../common/utils/math-utils";

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
            paddingHorizontal: 10,
            paddingTop: 10,
          },
        ]}
      >
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            {
              paddingTop: 20,
              paddingBottom: 10,
            },
          ]}
        >
          <Pressable
            onPress={() => navigator.goBack()}
            style={{ paddingRight: 10 }}
          >
            <ExpoIcon name="chevron-back" size={20}></ExpoIcon>
          </Pressable>
          <Text
            style={[
              {
                fontSize: 17,
                letterSpacing: 1,
                fontWeight: "500",
              },
            ]}
          >
            Inventory
          </Text>
        </View>
        <View
          style={[
            style.flexRow,
            style.border,
            style.rounded,
            style.itemsCenter,
            {
              flex: 1,
              flexWrap: "wrap",
              backgroundColor: colors.gray[100],
              marginTop: 10,
              paddingBottom: 10,
              paddingTop: 5,
            },
          ]}
        >
          {Object.keys(inventory).map((resource, index) => {
            if (get(resource as Resources) <= 0) return;
            return (
              <View
                key={`inventory-item-${resource}-${index}`}
                style={[
                  style.flexRow,
                  style.justifyCenter,
                  style.itemsCenter,
                  { padding: 10, width: 60, height: 60 },
                ]}
              >
                <ResourceIcon
                  resource={resource as Resources}
                  size={40}
                ></ResourceIcon>
                <Text
                  style={[
                    style.textShadowMd,
                    {
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      fontWeight: "700",
                      color: colors.white,
                    },
                  ]}
                >
                  {get(resource as Resources) >= 1000000
                    ? MathUtils.convertToReduceStrFormat(
                        get(resource as Resources)
                      )
                    : get(resource as Resources)}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </CustomPage>
  );
}
