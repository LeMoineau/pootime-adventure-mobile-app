import * as NavigationBar from "expo-navigation-bar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../../common/utils/color-utils";
import AppTopBar from "../../common/components/layout/AppTopBar";
import EventPosterOverlay from "../../common/components/layout/EventPosterOverlay";
import { useEffect } from "react";
import FightTab from "./fight";
import HomeTab from "./home";
import VillageTab from "./village";
import StatsTab from "./stats";
import ShopTab from "./shop";
import { NavigationContainer } from "@react-navigation/native";
import AppBottomBar from "../../common/components/layout/AppBottomBar";
import { usePathname } from "expo-router";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const path = usePathname();

  useEffect(() => {
    if (path === "/") {
      NavigationBar.setVisibilityAsync("hidden");

      return () => {
        NavigationBar.setVisibilityAsync("visible");
      };
    }
  }, [path]);

  return (
    <>
      <AppTopBar></AppTopBar>
      <EventPosterOverlay></EventPosterOverlay>
      <NavigationContainer>
        <Tab.Navigator
          tabBarPosition="bottom"
          initialRouteName="home"
          backBehavior="history"
          pagerStyle={[{ flex: 1 }]}
          tabBar={(props) => <AppBottomBar {...props} />}
          style={[{ backgroundColor: colors.transparent }]}
        >
          <Tab.Screen name="fight" component={FightTab} />
          <Tab.Screen name="stats" component={StatsTab} />
          <Tab.Screen name="home" component={HomeTab} />
          <Tab.Screen name="village" component={VillageTab} />
          <Tab.Screen name="shop" component={ShopTab} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
