import * as React from "react";
import Home from "./home/Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import PooEditor from "./editor/PooEditor";
import PooFight from "./fight/PooFight";
import { StatusBar } from "expo-status-bar";
import { colors } from "../common/utils/color-utils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTopBar from "../common/components/navigation/AppTopBar";
import InventoryPage from "./inventory/InventoryPage";
import AppBottomBar from "../common/components/navigation/AppBottomBar";
import { useBlurStore } from "../common/stores/blur.store";
import { Pressable, useWindowDimensions } from "react-native";
import Blur from "../common/components/views/Blur";
import ShopPage from "./shop/ShopPage";
import { useResourcesStore } from "../common/stores/resources.store";
import { useItemsUnlockedStore } from "../common/stores/items-unlocked.store";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const { earn } = useResourcesStore();
  const { resetData } = useItemsUnlockedStore();

  React.useEffect(() => {
    resetData();
    earn("pooCoins", 0);
    earn("stars", 10);
  }, []);

  return (
    <>
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator
          initialRouteName="App"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="App" component={MainPage} />
          <Stack.Screen name="Inventory" component={InventoryPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function MainPage() {
  return (
    <>
      <AppTopBar></AppTopBar>
      <Blur></Blur>
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName="Home"
        pagerStyle={[{ flex: 1 }]}
        tabBar={(props) => <AppBottomBar {...props} />}
        style={[{ backgroundColor: colors.transparent }]}
      >
        <Tab.Screen name="Battle" component={PooFight} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Shop" component={ShopPage} />
      </Tab.Navigator>
    </>
  );
}
