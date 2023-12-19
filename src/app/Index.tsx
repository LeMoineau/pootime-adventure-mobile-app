import * as React from "react";
import Home from "./home/Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CustomTabBar from "../common/components/navigation/CustomTabBar";
import PooEditor from "./editor/PooEditor";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName="Editor"
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Battle" component={Home} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Editor" component={PooEditor} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
