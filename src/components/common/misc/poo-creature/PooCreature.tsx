import { Image, View, ViewProps } from "react-native";
import React from "react";
import PooFace from "../../icons/poo-creature/PooFace";
import PooBody from "../../icons/poo-creature/PooBody";
import { style } from "../../../../utils/style-utils";
import { usePooCreatureStyleStore } from "../../../../stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../../../stores/poo-creature-stats.store";
import { PooHeads } from "../../../../types/PooHeads";
import { CurveUtils } from "../../../../utils/curve-utils";
import { PooHeadName } from "../../../../types/shop/BuyableItem";

export default function PooCreature({
  width = 200,
  height,
  behind,
  onlyHead,
  bodyColorProps,
  headProps,
  expressionProps,
  levelProps,
  ...props
}: {
  width?: number;
  height?: number;
  behind?: boolean;
  onlyHead?: boolean;
  bodyColorProps?: string;
  headProps?: PooHeadName;
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
      {!onlyHead && <PooBody fillColor={bodyColorProps ?? bodyColor}></PooBody>}
      {PooHeads[headProps ?? head]({
        fillColor: CurveUtils.calculateHeadColor(levelProps ?? level),
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
