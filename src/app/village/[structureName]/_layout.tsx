import CustomPage from "../../../common/components/navigation/CustomPage";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { colors } from "../../../common/utils/color-utils";
import { style } from "../../../common/utils/style-utils";
import {
  StructureName,
  Structures,
} from "../../../common/config/constants/Structures";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useState } from "react";
import { useVillageStore } from "../../../common/stores/village.store";
import StructureIcon from "../../../common/components/icons/StructureIcon";
import * as NavigationBar from "expo-navigation-bar";
import StructureInfosTopBar from "../../../features/structure-infos/components/StructureInfosTopBar";
import StructureInfosBuildTab from "../../../features/structure-infos/components/tabs/StructureInfosBuildTab";
import StructureInfosMainTab from "../../../features/structure-infos/components/tabs/StructureInfosMainTab";
import StructureInfosUpgradeTab from "../../../features/structure-infos/components/tabs/StructureInfosUpgradeTab";
import { useLocalSearchParams, useRouter } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { DataInStorage } from "../../../config/DataInStorage";

const Tab = createMaterialTopTabNavigator();

export default function StructureInfosLayout() {
  const router = useRouter();
  const { structureName } = useLocalSearchParams<{
    structureName: StructureName;
  }>();
  const { get, select } = useVillageStore();

  const [structure, setStructure] = useState<DataInStorage.Structure>();
  const structureUnlocked = structure && structure.level > 0;

  useEffect(() => {
    select(structureName);
    NavigationBar.setVisibilityAsync("visible");

    return () => {
      NavigationBar.setVisibilityAsync("hidden");
    };
  }, []);

  useEffect(() => {
    if (structureName) {
      console.log("structname", structureName);
      setStructure(get(structureName));
    }
  }, [structureName]);

  return (
    <CustomPage
      style={[{ paddingTop: 70, paddingHorizontal: 10 }]}
      bgColor="transparent"
    >
      {structure ? (
        <View
          style={[
            style.border,
            {
              flex: 1,
              backgroundColor: colors.gray[50],
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          ]}
        >
          <View
            style={[
              style.flexCol,
              style.justifyCenter,
              style.itemsCenter,
              {
                height: 200,
                backgroundColor: colors.gray[200],
                borderBottomColor: colors.gray[300],
                borderBottomWidth: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
            ]}
          >
            <Pressable
              onPress={() => router.back()}
              style={[{ position: "absolute", top: 0, right: 0, padding: 10 }]}
            >
              <ExpoIcon name="close" size={25}></ExpoIcon>
            </Pressable>
            <StructureIcon
              structureName={structureName}
              level={structure.level}
              size={150}
            ></StructureIcon>
            <View
              style={[
                style.flexRow,
                {
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  alignItems: "flex-end",
                },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 20,
                    fontWeight: "600",
                    letterSpacing: 1,
                  },
                ]}
              >
                {structureUnlocked ? Structures[structureName].name : "???"}
              </Text>
              <Text
                style={[
                  style.roundedSm,
                  {
                    backgroundColor: colors.blue[400],
                    color: colors.white,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    fontSize: 10,
                    marginLeft: 5,
                  },
                ]}
              >
                Level {get(structureName).level}
              </Text>
            </View>
          </View>
          <NavigationContainer independent={true}>
            <Tab.Navigator
              initialRouteName={structureUnlocked ? "Main" : "Build"}
              tabBar={(props) => (
                <StructureInfosTopBar
                  {...props}
                  icons={[
                    ...(structureUnlocked
                      ? []
                      : [<ExpoIcon name="build" size={20}></ExpoIcon>]),
                    <ExpoIcon name="house" size={20}></ExpoIcon>,
                    ...(!structureUnlocked
                      ? []
                      : [<ExpoIcon name="caret-up" size={20}></ExpoIcon>]),
                  ]}
                />
              )}
            >
              {!structureUnlocked && (
                <Tab.Screen name="Build" component={StructureInfosBuildTab} />
              )}
              <Tab.Screen name="Main" component={StructureInfosMainTab} />
              {structureUnlocked && (
                <Tab.Screen
                  name="Upgrade"
                  component={StructureInfosUpgradeTab}
                />
              )}
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      ) : (
        <ActivityIndicator size="large"></ActivityIndicator>
      )}
    </CustomPage>
  );
}
