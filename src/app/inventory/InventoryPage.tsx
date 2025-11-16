import { Pressable, ScrollView, Text, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import ExpoIcon from "../../common/components/icons/ExpoIcon";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { useResourcesStore } from "../../common/stores/resources.store";
import { Resources } from "../../common/config/constants/Resources";
import { style } from "../../common/utils/style-utils";
import InventoryItem from "../../common/components/items/slot/InventorySlotItem";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

export default function InventoryPage() {
  const navigator: useNavigationType = useNavigation();
  const { inventory } = useResourcesStore();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("visible");

    return () => {
      NavigationBar.setVisibilityAsync("hidden");
    };
  }, []);

  return (
    <CustomPage
      bgColor={colors.transparent}
      style={{ justifyContent: "flex-end" }}
    >
      <Pressable
        onPress={() => navigator.goBack()}
        style={{ flex: 1 }}
      ></Pressable>
      <View>
        <ScrollView
          style={[
            style.border,
            {
              backgroundColor: colors.white,
              margin: 10,
              marginBottom: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 10,
              paddingTop: 10,
              paddingBottom: 100,
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
                flexWrap: "wrap",
                backgroundColor: colors.gray[100],
                marginTop: 10,
                paddingBottom: 10,
                paddingTop: 5,
              },
            ]}
          >
            {Object.keys(inventory).map((resource, index) => (
              <InventoryItem
                resource={resource as Resources}
                key={index}
              ></InventoryItem>
            ))}
          </View>
        </ScrollView>
      </View>
    </CustomPage>
  );
}
