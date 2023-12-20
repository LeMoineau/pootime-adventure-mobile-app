import * as React from "react";
import Home from "./home/Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CustomTabBar from "../common/components/navigation/CustomTabBar";
import PooEditor from "./editor/PooEditor";
import PooFight from "./fight/PooFight";
import { View, useWindowDimensions } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <NavigationContainer>
      <View style={[{ flex: 1, height: height, width: width }]}>
        <Tab.Navigator
          tabBarPosition="bottom"
          initialRouteName="Home"
          pagerStyle={[{ flex: 1 }]}
          tabBar={(props) => <CustomTabBar {...props} />}
        >
          <Tab.Screen name="Battle" component={PooFight} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Editor" component={PooEditor} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
