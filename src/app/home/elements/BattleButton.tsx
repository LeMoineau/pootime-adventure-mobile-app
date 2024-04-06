import { Animated, Text, View } from "react-native";
import GradientButton from "../../../common/components/buttons/GradientButton";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import { useEffect, useRef, useState } from "react";

export default function BattleButton() {
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
              marginBottom: -50,
              paddingBottom: 85,
              borderRadius: 40,
              opacity: position,
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
          <View style={[style.flexRow, {}]}>
            <GradientButton
              viewStyle={[
                style.roundedFull,
                { flex: 1, borderTopEndRadius: 0, borderBottomEndRadius: 0 },
              ]}
              colors={[colors.yellow[400], colors.yellow[500]]}
            >
              <Text
                style={[
                  style.textCenter,
                  { color: colors.white, fontSize: 15, fontWeight: "500" },
                ]}
              >
                En ligne
              </Text>
            </GradientButton>
            {/* <View style={[{ width: 10 }]}></View> */}
            <GradientButton
              viewStyle={[
                style.roundedFull,
                {
                  flex: 1,
                  borderTopStartRadius: 0,
                  borderBottomStartRadius: 0,
                },
              ]}
              colors={[colors.blue[300], colors.blue[400]]}
            >
              <Text
                style={[
                  style.textCenter,
                  { color: colors.white, fontSize: 15, fontWeight: "500" },
                ]}
              >
                Partie privé
              </Text>
            </GradientButton>
          </View>

          <GradientButton
            viewStyle={[style.roundedFull, { flex: 0, marginTop: 10 }]}
            colors={[colors.pink[200], colors.pink[300]]}
          >
            <Text
              style={[
                style.textCenter,
                { color: colors.white, fontSize: 15, fontWeight: "500" },
              ]}
            >
              Saute-Mouton
            </Text>
          </GradientButton>
        </Animated.View>
        <GradientButton
          viewStyle={[style.roundedFull, { flex: 0 }]}
          colors={[colors.indigo[400], colors.indigo[500]]}
          onClick={() => setExpanded(!expanded)}
        >
          <View
            style={[
              style.flexRow,
              style.justifyBetween,
              style.itemsCenter,
              { flex: 1, paddingHorizontal: 20 },
            ]}
          >
            <View style={[{ opacity: 0 }]}>
              <ExpoIcon name="arrow-back" size={20}></ExpoIcon>
            </View>
            <Text
              style={[
                style.textCenter,
                { color: colors.white, fontSize: 17, fontWeight: "500" },
              ]}
            >
              Combattre
            </Text>
            <ExpoIcon
              name={!expanded ? "caret-up" : "caret-down"}
              size={20}
              style={[{ color: colors.white }]}
            ></ExpoIcon>
          </View>
        </GradientButton>
      </View>
    </>
  );
}
