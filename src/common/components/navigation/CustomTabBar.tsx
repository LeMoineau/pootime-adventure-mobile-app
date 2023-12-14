import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Animated, View, TouchableOpacity, Image } from "react-native";
import { style } from "../../services/style-utils";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  const navInfos = [
    {
      title: "Fight",
      image: require("./../../../../assets/poofight.svg"),
    },
    {
      title: "Home",
      image: require("./../../../../assets/poohome.svg"),
    },
    {
      title: "Edit",
      image: require("./../../../../assets/pooedit.svg"),
    },
  ];
  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        { height: 100, backgroundColor: "#FFE5A3" },
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
        const imageOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.2)),
        });
        const textOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });
        const textHeight = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 10 : 0)),
        });
        const width = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1.5 : 1)),
        });
        const bgColor = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) =>
            i === index ? "rgba(52, 152, 219, 0.9)" : "rgba(0, 0, 0, 0.2)"
          ),
        });

        return (
          <Animated.View
            style={[
              style.wFull,
              style.hFull,
              {
                flex: width,
                backgroundColor: bgColor,
                borderColor: "rgba(255, 255, 255, 0.4)",
                borderLeftWidth: 1,
                borderRightWidth: 1,
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
                style.flexCol,
                style.justifyCenter,
                style.itemsCenter,
                style.hFull,
                style.wFull,
              ]}
            >
              <Animated.Image
                source={navInfos[index].image}
                style={[{ height: 50, width: "100%", opacity: imageOpacity }]}
                resizeMode="contain"
              ></Animated.Image>
              <Animated.Text
                style={{
                  height: textHeight,
                  opacity: textOpacity,
                  textTransform: "uppercase",
                  textShadowColor: "black",
                  textShadowRadius: 5,
                  color: "white",
                  fontWeight: "bold",
                  marginTop: 3,
                }}
              >
                {navInfos[index].title}
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
}
