import { Image, View, ViewProps } from "react-native";
import PooHead from "../icons/head/PooHead";
import React from "react";
import PooFace from "../icons/poo/PooFace";
import PooBody from "../icons/poo/PooBody";
import { style } from "../../utils/style-utils";
import { usePooCreatureStyleStore } from "../../stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../stores/poo-creature-stats.store";
import { MathUtils } from "../../utils/math-utils";
import { PooHeads } from "../../types/PooHeads";

export default function PooCreature({
  width,
  height,
  behind,
  bodyColorProps,
  headProps,
  expressionProps,
  levelProps,
  ...props
}: {
  width?: number;
  height?: number;
  behind?: boolean;
  bodyColorProps?: string;
  headProps?: string;
  expressionProps?: string;
  levelProps?: number;
} & ViewProps) {
  const defaultWidth = 61.936;
  const defaultHeight = 90.068;

  const { bodyColor, head, expression } = usePooCreatureStyleStore();
  const { level } = usePooCreatureStatsStore();

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
      <PooBody fillColor={bodyColorProps ?? bodyColor}></PooBody>
      {PooHeads[headProps ?? head]({
        fillColor: MathUtils.calculateHeadColorFromLevel(levelProps ?? level),
        style: [
          {
            position: "absolute",
            top: 0,
            left: 0,
            transform: [{ rotateY: behind ? "180deg" : "0deg" }],
          },
        ],
      })}
      {!behind && (
        <>
          <PooFace
            fillColor={bodyColorProps ?? bodyColor}
            style={[{ position: "absolute", top: 0, left: 0 }]}
          ></PooFace>
          <View
            style={[
              style.wFull,
              style.hFull,
              { position: "absolute", top: 0, left: 0 },
            ]}
          >
            <Image
              source={{ uri: expressionProps ?? expression }}
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </View>
        </>
      )}
    </View>
  );
}
