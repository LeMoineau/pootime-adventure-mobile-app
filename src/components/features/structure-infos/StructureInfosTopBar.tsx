import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Animated, TouchableOpacity, View } from "react-native";
import { colors } from "../../../utils/color-utils";
import { style } from "../../../utils/style-utils";
import React from "react";

export default function StructureInfosTopBar({
  state,
  descriptors,
  navigation,
  position,
  icons,
}: { icons: React.ReactNode[] } & MaterialTopTabBarProps) {
  return (
    <>
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          {
            backgroundColor: colors.gray[100],
            borderBottomColor: colors.gray[200],
            borderBottomWidth: 1,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);

          return (
            <View
              key={index}
              style={[
                {
                  width: 50,
                  height: 50,
                },
              ]}
            >
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  style.flexRow,
                  style.justifyCenter,
                  style.itemsCenter,
                  { flex: 1, width: "100%" },
                ]}
              >
                {icons[index]}
              </TouchableOpacity>
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 2,
                    backgroundColor: colors.blue[400],
                    transform: [
                      {
                        translateX: position.interpolate({
                          inputRange,
                          outputRange: inputRange.map((i) =>
                            i - index < 0 ? -50 : i - index > 0 ? 50 : 0,
                          ),
                        }),
                      },
                    ],
                    opacity: position.interpolate({
                      inputRange,
                      outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                    }),
                  },
                ]}
              ></Animated.View>
            </View>
          );
        })}
      </View>
    </>
  );
}
