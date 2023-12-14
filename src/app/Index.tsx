import * as React from "react";
import Home from "./Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CustomTabBar from "../common/components/navigation/CustomTabBar";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName="Home"
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Battle" component={Home} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
