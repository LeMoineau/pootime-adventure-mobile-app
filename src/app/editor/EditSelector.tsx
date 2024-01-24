import React from "react";
import { Pressable, Text, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import { colors } from "../../common/utils/color-utils";
import PooCoinIcon from "../../common/components/icons/pooCoin";
import { Resources } from "../../common/types/Resources";
import WoolIcon from "../../common/components/icons/sheep/wool";

export interface EditSelectorProps {
  price?: number;
  onPress?: () => void;
  size?: number;
  resource?: Resources;
  bgColor?: string;
}

export default function EditSelector({
  children,
  price,
  onPress,
  size,
  resource,
  bgColor,
}: {
  children?: React.ReactNode;
} & EditSelectorProps) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          style.rounded,
          style.shadowMd,
          style.border,
          style.flexRow,
          style.justifyCenter,
          style.overflowHidden,
          {
            width: size ?? 50,
            height: size ?? 50,
            margin: 5,
            backgroundColor: bgColor ?? colors.transparent,
            borderWidth: price ? 5 : 1,
            borderColor: price ? colors.red[400] : colors.gray[100],
          },
        ]}
      >
        {children}
      </View>
      {price && (
        <View
          style={[
            {
              position: "absolute",
              bottom: 0,
              paddingHorizontal: 5,
              left: 0,
              width: "100%",
              transform: [{ rotateZ: "0deg" }],
            },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.justifyCenter,
              style.itemsCenter,
              style.roundedSm,
              { backgroundColor: colors.red[400] },
            ]}
          >
            <Text style={[style.textBold]}>{price} </Text>
            {resource ? (
              resource === "wool" ? (
                <WoolIcon size={20}></WoolIcon>
              ) : (
                <PooCoinIcon size={20}></PooCoinIcon>
              )
            ) : (
              <PooCoinIcon size={20}></PooCoinIcon>
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
}
