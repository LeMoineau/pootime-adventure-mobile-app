import * as React from "react";
import Home from "./home/Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import PooFight from "./fight/PooFight";
import { StatusBar } from "expo-status-bar";
import { colors } from "../common/utils/color-utils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTopBar from "../common/components/navigation/AppTopBar";
import InventoryPage from "./inventory/InventoryPage";
import AppBottomBar from "../common/components/navigation/AppBottomBar";
import Blur from "../common/components/views/Blur";
import ShopPage from "./shop/ShopPage";
import { useResourcesStore } from "../common/stores/resources.store";
import { useItemsUnlockedStore } from "../common/stores/items-unlocked.store";
import OnlineArena from "./online-arena/OnlineArena";
import EntityArena from "./entity-arena/EntityArena";
import Settings from "./settings/Settings";
import AccountSettings from "./settings/AccountSettings";
import DevSettings from "./settings/DevSettings";
import EventSettings from "./settings/EventSettings";
import DonationSettings from "./settings/DonationSettings";
import TutoSettings from "./settings/TutoSettings";
import VillagePage from "./village/VillagePage";
import StructureInfosPage from "./structure-infos/StructureInfosPage";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const { earn } = useResourcesStore();
  const { resetData } = useItemsUnlockedStore();

  React.useEffect(() => {
    // resetData();
    // earn("pooCoins", 0);
    // earn("stars", 10);
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
          <Stack.Screen
            name="Inventory"
            component={InventoryPage}
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="OnlineArena"
            component={OnlineArena}
          ></Stack.Screen>
          <Stack.Screen
            name="EntityArena"
            component={EntityArena}
          ></Stack.Screen>
          <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
          <Stack.Screen
            name="AccountSettings"
            component={AccountSettings}
          ></Stack.Screen>
          <Stack.Screen
            name="DevSettings"
            component={DevSettings}
          ></Stack.Screen>
          <Stack.Screen
            name="EventSettings"
            component={EventSettings}
          ></Stack.Screen>
          <Stack.Screen
            name="DonationSettings"
            component={DonationSettings}
          ></Stack.Screen>
          <Stack.Screen
            name="TutoSettings"
            component={TutoSettings}
          ></Stack.Screen>
          <Stack.Screen
            name="StructureInfos"
            component={StructureInfosPage}
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
            }}
          ></Stack.Screen>
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
        <Tab.Screen name="Village" component={VillagePage} />
        <Tab.Screen name="Shop" component={ShopPage} />
      </Tab.Navigator>
    </>
  );
}
