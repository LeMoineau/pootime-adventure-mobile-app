import { DimensionValue, Text, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";

export interface ProgressBarProps {
  width?: DimensionValue;
  height?: number;
  progressColor?: string;
  showProgressText?: boolean;
  appendText?: string;
}

export default function ProgressBar({
  max,
  current,
  width,
  height,
  progressColor,
  showProgressText,
  appendText,
  ...props
}: { max: number; current: number } & ProgressBarProps & ViewProps) {
  return (
    <View {...props}>
      <View
        style={[
          style.roundedFull,
          style.overflowHidden,
          style.shadowMd,
          { width: width ?? 150, height: height ?? 15 },
        ]}
      >
        <View
          style={[style.wFull, style.hFull, { backgroundColor: "white" }]}
        ></View>
        <View
          style={[
            style.wFull,
            style.hFull,
            style.roundedFull,
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: `${(current / max) * 100}%`,
              backgroundColor: progressColor ?? "#4a9fff",
            },
          ]}
        ></View>
        {showProgressText && (
          <View
            style={[
              style.wFull,
              style.hFull,
              style.flexCol,
              style.justifyCenter,
              style.itemsCenter,
              {
                position: "absolute",
                top: 0,
                left: 0,
              },
            ]}
          >
            <Text
              style={[
                style.textShadowMd,
                style.textBold,
                {
                  textAlign: "center",
                  color: colors.white,
                },
              ]}
            >{`${current}/${max}`}</Text>
          </View>
        )}
      </View>
      {appendText && (
        <View
          style={[
            style.roundedSm,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            style.shadowMd,
            {
              position: "absolute",
              left: 0,
              top: height ? -5 : -7,
              minWidth: height ? height + 10 : 30,
              height: height ? height + 10 : 30,
              backgroundColor: progressColor ?? "#4a9fff",
              paddingHorizontal: 5,
            },
          ]}
        >
          <Text style={[style.textMd, { color: "white", fontWeight: "bold" }]}>
            {appendText}
          </Text>
        </View>
      )}
    </View>
  );
}
