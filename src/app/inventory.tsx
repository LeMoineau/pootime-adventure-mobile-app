import { Pressable, ScrollView, Text, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { useResourcesStore } from "../common/stores/resources.store";
import CustomPage from "../common/components/navigation/CustomPage";
import { colors } from "../common/utils/color-utils";
import { router } from "expo-router";
import { style } from "../common/utils/style-utils";
import ExpoIcon from "../common/components/icons/ExpoIcon";
import InventorySlotItem from "../common/components/items/slot/InventorySlotItem";
import { Resources } from "../common/config/constants/Resources";

export default function InventoryPage() {
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
      <Pressable onPress={() => router.back()} style={{ flex: 1 }}></Pressable>
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
            <Pressable onPress={() => router.back} style={{ paddingRight: 10 }}>
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
              <InventorySlotItem
                resource={resource as Resources}
                key={index}
              ></InventorySlotItem>
            ))}
          </View>
        </ScrollView>
      </View>
    </CustomPage>
  );
}
