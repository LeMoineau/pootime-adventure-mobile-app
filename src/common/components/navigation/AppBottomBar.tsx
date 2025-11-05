import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import {
  Animated,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { style } from "../../utils/style-utils";

const FOCUSED_TAB_OFFSET = 50;

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
  const { width } = useWindowDimensions();
  const nbTab = state.routes.length;
  const standardWidth = width / nbTab - FOCUSED_TAB_OFFSET / nbTab;
  const focusedWidth = standardWidth + FOCUSED_TAB_OFFSET;

  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        {
          width,
          height: 70,
          elevation: 0,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.1)",
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
          <Animated.View
            key={index}
            style={[
              style.hFull,
              {
                width: isFocused ? focusedWidth : standardWidth,
                // transform: [
                //   {
                //     scaleX: isFocused
                //       ? 1
                //       : position.interpolate({
                //           inputRange,
                //           outputRange: inputRange.map((i) =>
                //             i === index ? focusedWidth / standardWidth : 1
                //           ),
                //         }),
                //   },
                // ],
                backgroundColor: position.interpolate({
                  inputRange,
                  outputRange: inputRange.map((i) =>
                    i === index ? "#4a9fff" : "transparent"
                  ),
                }),
                borderLeftWidth: index !== 0 ? 1 : 0,
                borderLeftColor: "rgba(0, 0, 0, 0.1)",
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
                { paddingBottom: 5 },
              ]}
            >
              <Animated.Image
                source={navInfos[index].image}
                style={[
                  {
                    height: 50,
                    width: "100%",
                    transform: [
                      {
                        scale: position.interpolate({
                          inputRange,
                          outputRange: inputRange.map((i) =>
                            i === index ? 1.1 : 0.9
                          ),
                        }),
                      },
                      {
                        translateY: position.interpolate({
                          inputRange,
                          outputRange: inputRange.map((i) =>
                            i === index ? 0 : 15
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
                  textShadowRadius: 2,
                  textShadowOffset: { width: 0, height: 1 },
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
