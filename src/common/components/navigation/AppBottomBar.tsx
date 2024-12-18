import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Animated, View, TouchableOpacity } from "react-native";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";

export default function AppBottomBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  const navInfos = [
    {
      title: "Fight",
      image: {
        uri: "https://bigstones.fr/pootime-adventure/leaderboard.png",
      },
    },
    {
      title: "Stats",
      image: {
        uri: "https://bigstones.fr/pootime-adventure/poofight.png",
      },
    },
    {
      title: "Home",
      image: {
        uri: "https://bigstones.fr/pootime-adventure/poo.png",
      },
    },
    {
      title: "Village",
      image: {
        uri: "https://bigstones.fr/pootime-adventure/poohome.png",
      },
    },
    {
      title: "Edit",
      image: {
        uri: "https://bigstones.fr/pootime-adventure/pooedit.png",
      },
    },
  ];
  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        {
          width: "100%",
          height: 70,
          elevation: 0,
          backgroundColor: colors.baseBackgroundColor,
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
        const imageOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.2)),
        });
        const bgColor = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) =>
            i === index ? "#4a9fff" : "rgba(0, 0, 0, 0.2)"
          ),
        });

        return (
          <Animated.View
            key={index}
            style={[
              style.wFull,
              style.hFull,
              {
                flex: 1,
                backgroundColor: bgColor,
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
                style={[
                  {
                    height: 50,
                    width: "100%",
                    opacity: imageOpacity,
                    transform: [
                      {
                        scale: position.interpolate({
                          inputRange,
                          outputRange: inputRange.map((i) =>
                            i === index ? 1.1 : 0.8
                          ),
                        }),
                      },
                    ],
                  },
                ]}
                resizeMode="contain"
              ></Animated.Image>
              <Animated.Text
                style={{
                  textTransform: "uppercase",
                  textShadowColor: "black",
                  textShadowRadius: 5,
                  color: "white",
                  fontWeight: "bold",
                  marginTop: 5,
                  marginBottom: 5,
                  transform: [
                    {
                      scale: position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((i) =>
                          i === index ? 1 : 0
                        ),
                      }),
                    },
                  ],
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
