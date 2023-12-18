import { Text, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { style } from "../../utils/style-utils";

export default function ProgressBar({
  max,
  current,
  width,
  height,
  progressColor,
  showProgressText,
  appendText,
  ...props
}: {
  max: number;
  current: number;
  width?: number;
  height?: number;
  progressColor?: string;
  showProgressText?: boolean;
  appendText?: string;
} & ViewProps) {
  return (
    <View {...props}>
      <View
        style={[
          style.rounded,
          style.overflowHidden,
          style.shadowMd,
          { width: width ?? 150, height: height ?? 15, marginLeft: 15 },
        ]}
      >
        <View
          style={[style.wFull, style.hFull, { backgroundColor: "white" }]}
        ></View>
        <View
          style={[
            style.wFull,
            style.hFull,
            style.rounded,
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
          <Text
            style={[
              style.wFull,
              style.hFull,
              style.flexCol,
              style.justifyCenter,
              style.itemsCenter,
              style.textShadowMd,
              {
                position: "absolute",
                top: 0,
                left: 0,
                textAlign: "center",
                color: "white",
              },
            ]}
          >{`${current}/${max}`}</Text>
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
