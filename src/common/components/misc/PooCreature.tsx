import { View, ViewProps } from "react-native";
import PooHead from "../icons/poo/PooHead";
import React from "react";
import PooFace from "../icons/poo/PooFace";
import PooBody from "../icons/poo/PooBody";
import { style } from "../../utils/style-utils";

export default function PooCreature({
  expression,
  bodyColor,
  width,
  height,
  ...props
}: {
  expression: React.ReactNode;
  bodyColor: string;
  width?: number;
  height?: number;
} & ViewProps) {
  const defaultWidth = 61.936;
  const defaultHeight = 90.068;
  return (
    <View
      style={[
        {
          transform: "scale(1)",
          width:
            width ??
            (height ? (defaultWidth * height) / defaultHeight : defaultHeight),
          height:
            height ??
            (width ? (defaultHeight * width) / defaultWidth : defaultWidth),
        },
      ]}
      {...props}
    >
      <PooBody fillColor={bodyColor}></PooBody>
      <PooHead style={[{ position: "absolute", top: 0, left: 0 }]}></PooHead>
      <PooFace
        fillColor={bodyColor}
        style={[{ position: "absolute", top: 0, left: 0 }]}
      ></PooFace>
      <View
        style={[
          style.wFull,
          style.hFull,
          { position: "absolute", top: 0, left: 0 },
        ]}
      >
        {expression}
      </View>
    </View>
  );
}
