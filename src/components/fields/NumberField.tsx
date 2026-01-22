import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { style } from "../../utils/style-utils";
import React, { useEffect } from "react";
import { colors } from "../../utils/color-utils";
import { MathUtils } from "../../utils/math-utils";

export default function NumberField({
  value,
  appendImage,
  appendElement,
  useReduceNumberFormat,
  ...props
}: {
  value: number;
  appendImage?: ImageSourcePropType;
  appendElement?: React.ReactNode;
  useReduceNumberFormat?: boolean;
} & ViewProps) {
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        useNativeDriver: false,
        duration: 200,
      }),
      Animated.timing(scaleValue, {
        toValue: 0,
        useNativeDriver: false,
        duration: 200,
      }),
    ]).start();
  }, [value]);

  return (
    <View {...props}>
      <View
        style={[
          {
            marginRight: appendElement ? 25 : appendImage ? 25 : 0,
          },
        ]}
      >
        <View
          style={[
            style.shadowMd,
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            {
              backgroundColor: "white",
              paddingRight: 17,
              paddingLeft: 15,
              height: 36,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}
        >
          <Animated.Text
            style={[
              style.textMd,
              {
                flex: 1,
                fontWeight: "600",
                textAlign: "right",
                color: scaleValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [colors.black, colors.green[600]],
                }),
                transform: [
                  {
                    scale: scaleValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    }),
                  },
                ],
              },
            ]}
          >
            {useReduceNumberFormat
              ? MathUtils.convertToReduceStrFormat(value)
              : value}
          </Animated.Text>
          {appendImage && (
            <Image
              source={appendImage}
              style={[
                {
                  position: "absolute",
                  top: -2,
                  right: -25,
                  width: 40,
                  height: 40,
                },
              ]}
              resizeMode="contain"
            ></Image>
          )}
          {appendElement && (
            <View
              style={[
                {
                  position: "absolute",
                  top: -2,
                  right: -25,
                  width: 40,
                  height: 40,
                },
              ]}
            >
              {appendElement}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
