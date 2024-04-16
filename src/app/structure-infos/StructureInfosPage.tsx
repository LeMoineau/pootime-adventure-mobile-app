import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useNavigationType,
  useRouteType,
} from "../../common/types/navigation/NavigationTypes";
import CustomPage from "../../common/components/navigation/CustomPage";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../common/utils/color-utils";
import { style } from "../../common/utils/style-utils";
import { Structures } from "../../common/config/game-data/Structures";
import ExpoIcon from "../../common/components/icons/ExpoIcon";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StructureInfosTopBar from "./elements/navigation/StructureInfosTopBar";
import StructureInfosMainTab from "./elements/tabs/StructureInfosMainTab";
import StructureInfosUpgradeTab from "./elements/tabs/StructureInfosUpgradeTab";
import { useEffect } from "react";
import { useVillageStore } from "../../common/stores/village.store";
import StructureIcon from "../../common/components/icons/StructureIcon";
import StructureInfosBuildTab from "./elements/tabs/StructureInfosBuildTab";

const Tab = createMaterialTopTabNavigator();

export default function StructureInfosPage() {
  const route: useRouteType<"StructureInfos"> = useRoute();
  const navigator: useNavigationType = useNavigation();
  const { get, select } = useVillageStore();

  const structure = () => Structures[route.params.structureName];

  const structureUnlocked = () => get(structure().type).level > 0;

  useEffect(() => {
    select(route.params.structureName);
  }, []);

  return (
    <CustomPage
      style={[{ paddingTop: 60, paddingHorizontal: 10 }]}
      bgColor="transparent"
    >
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
            onPress={() => navigator.goBack()}
            style={[{ position: "absolute", top: 0, right: 0, padding: 10 }]}
          >
            <ExpoIcon name="close" size={25}></ExpoIcon>
          </Pressable>
          <StructureIcon
            structureName={route.params.structureName}
            level={get(structure().type).level}
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
              {structureUnlocked() ? structure().name : "???"}
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
              Level {get(route.params.structureName).level}
            </Text>
          </View>
        </View>
        <Tab.Navigator
          initialRouteName={structureUnlocked() ? "Main" : "Build"}
          tabBar={(props) => (
            <StructureInfosTopBar
              {...props}
              icons={[
                ...(structureUnlocked()
                  ? []
                  : [<ExpoIcon name="build" size={20}></ExpoIcon>]),
                <ExpoIcon name="house" size={20}></ExpoIcon>,
                ...(!structureUnlocked()
                  ? []
                  : [<ExpoIcon name="caret-up" size={20}></ExpoIcon>]),
              ]}
            />
          )}
        >
          {!structureUnlocked() && (
            <Tab.Screen name="Build" component={StructureInfosBuildTab} />
          )}
          <Tab.Screen name="Main" component={StructureInfosMainTab} />
          {structureUnlocked() && (
            <Tab.Screen name="Upgrade" component={StructureInfosUpgradeTab} />
          )}
        </Tab.Navigator>
      </View>
    </CustomPage>
  );
}
