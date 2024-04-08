import { Animated, Text, View } from "react-native";
import StandardButton from "../../../../common/components/buttons/StandardButton";
import { style } from "../../../../common/utils/style-utils";
import { colors } from "../../../../common/utils/color-utils";
import ExpoIcon from "../../../../common/components/icons/ExpoIcon";
import { useEffect, useRef, useState } from "react";

export default function HomeBattleButton() {
  const position = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) {
      Animated.timing(position, {
        toValue: 1,
        useNativeDriver: false,
        duration: 250,
      }).start();
    } else {
      Animated.timing(position, {
        toValue: 0,
        useNativeDriver: false,
        duration: 250,
      }).start();
    }
  }, [expanded]);

  return (
    <>
      <View style={[style.flexCol, { width: "100%", paddingBottom: 20 }]}>
        <Animated.View
          style={[
            style.flexCol,
            {
              position: "absolute",
              bottom: "100%",
              left: 0,
              width: "100%",
              backgroundColor: colors.white,
              paddingVertical: 20,
              paddingHorizontal: 20,
              marginBottom: -40,
              paddingBottom: 75,
              borderRadius: 40,
              opacity: position.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: position.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
                {
                  scaleY: position.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={[style.flexRow, { width: "100%" }]}>
            <StandardButton
              style={[{ flex: 1 }]}
              viewStyle={[
                style.roundedFull,
                { borderTopEndRadius: 0, borderBottomEndRadius: 0 },
              ]}
              bgColor={colors.yellow[400]}
              textStyle={[
                style.textCenter,
                { color: colors.white, fontSize: 15, fontWeight: "500" },
              ]}
            >
              Online
            </StandardButton>
            {/* <View style={[{ width: 10 }]}></View> */}
            <StandardButton
              style={[{ flex: 1 }]}
              viewStyle={[
                style.roundedFull,
                {
                  borderTopStartRadius: 0,
                  borderBottomStartRadius: 0,
                },
              ]}
              bgColor={colors.blue[300]}
              textStyle={[
                style.textCenter,
                { color: colors.white, fontSize: 15, fontWeight: "500" },
              ]}
            >
              Private
            </StandardButton>
          </View>

          <StandardButton
            viewStyle={[style.roundedFull, { flex: 0, marginTop: 10 }]}
            bgColor={colors.pink[200]}
            textStyle={[
              style.textCenter,
              { color: colors.white, fontSize: 15, fontWeight: "500" },
            ]}
          >
            Saute-Mouton
          </StandardButton>
        </Animated.View>
        <StandardButton
          viewStyle={[style.roundedFull, { flex: 0 }]}
          bgColor={colors.indigo[400]}
          onPress={() => setExpanded(!expanded)}
          appendIcon={
            <ExpoIcon
              name={!expanded ? "caret-up" : "caret-down"}
              size={20}
              style={[{ color: colors.white }]}
            ></ExpoIcon>
          }
          prependIcon={
            <View style={[{ opacity: 0 }]}>
              <ExpoIcon name="arrow-back" size={20}></ExpoIcon>
            </View>
          }
          textStyle={[{ color: colors.white, fontSize: 17, fontWeight: "500" }]}
        >
          Battle
        </StandardButton>
      </View>
    </>
  );
}
